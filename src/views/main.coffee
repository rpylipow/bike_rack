app = require('ampersand-app')
setFavicon = require('favicon-setter')
View = require('ampersand-view')
dom = require('ampersand-dom')
ViewSwitcher = require('ampersand-view-switcher')
result = require('amp-result')
domify = require('domify')
localLinks = require('local-links')
templates = require('../templates')

module.exports = View.extend
  template: templates.body
  autoRender: true
  events: 
    'click a[href]': 'handleLinkClick'
      
  initialize: ->
    # this marks the correct nav item selected
    this.listenTo(app, 'page', this.handleNewPage)
  
  render: ->
    # some additional stuff we want to add to the document head
    head = document.head
    head.insertBefore(domify(templates.head()), head.childNodes[0])
    typekit = document.createElement('script')
    typekit.type = 'text/javascript'
    typekit.text = "
      (function(d) {
        var config = {
          kitId: 'vdl0aju',
          scriptTimeout: 3000
        },
        h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,\"\")+\" wf-inactive\";},config.scriptTimeout),tk=d.createElement(\"script\"),f=false,s=d.getElementsByTagName(\"script\")[0],a;h.className+=\" wf-loading\";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!=\"complete\"&&a!=\"loaded\")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
      })(document);
    "    
    head.insertBefore(typekit, head.childNodes[2])
    googleAnalytics = document.createElement('script')
    googleAnalytics.type = 'text/javascript'
    googleAnalytics.text = "
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-61751724-1', 'auto');
      ga('send', 'pageview');
    "
    head.appendChild(googleAnalytics)  

    # main renderer
    @renderWithTemplate(@)

    # init and configure our page switcher
    @pageSwitcher = new ViewSwitcher(@queryByHook('page-container'), {
      show: (newView, oldView) =>
        # it's inserted and rendered for me
        document.title = result(newView, 'pageTitle') or 'Chow'
        document.scrollTop = 0

        # add a class specifying it's active
        dom.addClass(newView.el, 'active')

        # store an additional reference, just because
        app.currentPage = newView
    })
    setFavicon('/favicon.ico')   

  handleNewPage: (view) ->
    # tell the view switcher to render the new one
    @pageSwitcher.set(view)

  handleLinkClick: (e) ->
    localPath = localLinks.pathname(e)
    if localPath
      e.preventDefault()
      app.navigate(localPath)
