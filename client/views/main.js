(function() {
  var View, ViewSwitcher, app, dom, domify, localLinks, result, setFavicon, templates;

  app = require('ampersand-app');

  setFavicon = require('favicon-setter');

  View = require('ampersand-view');

  dom = require('ampersand-dom');

  ViewSwitcher = require('ampersand-view-switcher');

  result = require('amp-result');

  domify = require('domify');

  localLinks = require('local-links');

  templates = require('../templates');

  module.exports = View.extend({
    template: templates.body,
    autoRender: true,
    events: {
      'click a[href]': 'handleLinkClick'
    },
    initialize: function() {
      return this.listenTo(app, 'page', this.handleNewPage);
    },
    render: function() {
      var head, typekit;
      head = document.head;
      head.insertBefore(domify(templates.head()), head.childNodes[0]);
      typekit = document.createElement('script');
      typekit.type = 'text/javascript';
      typekit.text = "(function(d) { var config = { kitId: 'vdl0aju', scriptTimeout: 3000 }, h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,\"\")+\" wf-inactive\";},config.scriptTimeout),tk=d.createElement(\"script\"),f=false,s=d.getElementsByTagName(\"script\")[0],a;h.className+=\" wf-loading\";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!=\"complete\"&&a!=\"loaded\")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s) })(document);";
      head.insertBefore(typekit, head.childNodes[2]);
      this.renderWithTemplate(this);
      this.pageSwitcher = new ViewSwitcher(this.queryByHook('page-container'), {
        show: (function(_this) {
          return function(newView, oldView) {
            document.title = result(newView, 'pageTitle') || 'Chow';
            document.scrollTop = 0;
            dom.addClass(newView.el, 'active');
            return app.currentPage = newView;
          };
        })(this)
      });
      return setFavicon('/favicon.ico');
    },
    handleNewPage: function(view) {
      return this.pageSwitcher.set(view);
    },
    handleLinkClick: function(e) {
      var localPath;
      localPath = localLinks.pathname(e);
      if (localPath) {
        e.preventDefault();
        return app.navigate(localPath);
      }
    }
  });

}).call(this);
