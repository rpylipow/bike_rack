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
      document.head.appendChild(domify(templates.head()));
      this.renderWithTemplate(this);
      this.pageSwitcher = new ViewSwitcher(this.queryByHook('page-container'), {
        show: function(newView, oldView) {
          document.title = result(newView, 'pageTitle') || 'Rdio Client App';
          document.scrollTop = 0;
          dom.addClass(newView.el, 'active');
          return app.currentPage = newView;
        }
      });
      return setFavicon('/favicon.ico');
    },
    handleNewPage: function(view) {
      this.pageSwitcher.set(view);
      return this.updateActiveNav();
    },
    handleLinkClick: function(e) {
      var localPath;
      localPath = localLinks.pathname(e);
      if (localPath) {
        e.preventDefault();
        return app.navigate(localPath);
      }
    },
    updateActiveNav: function() {
      var path;
      path = window.location.pathname.slice(1);
      return this.queryAll('.nav a[href]').forEach(function(aTag) {
        var aPath;
        aPath = aTag.pathname.slice(1);
        if (!aPath && !path || aPath && path.indexOf(aPath) === 0) {
          return dom.addClass(aTag.parentNode, 'active');
        } else {
          return dom.removeClass(aTag.parentNode, 'active');
        }
      });
    }
  });

}).call(this);
