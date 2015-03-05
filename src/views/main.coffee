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
    document.head.appendChild(domify(templates.head()))

    # main renderer
    @renderWithTemplate(this)

    # init and configure our page switcher
    @pageSwitcher = new ViewSwitcher(this.queryByHook('page-container'), {
      show: (newView, oldView) ->
        # it's inserted and rendered for me
        document.title = result(newView, 'pageTitle') or 'Rdio Client App'
        document.scrollTop = 0

        # add a class specifying it's active
        dom.addClass(newView.el, 'active')

        # store an additional reference, just because
        app.currentPage = newView
    })

    # setting a favicon for fun (note, it's dynamic)
    setFavicon('/favicon.ico')   

  handleNewPage: (view) ->
    # tell the view switcher to render the new one
    @pageSwitcher.set(view)

    # mark the correct nav item selected
    @updateActiveNav()

  handleLinkClick: (e) ->
    localPath = localLinks.pathname(e)
    
    if localPath
      e.preventDefault()
      app.navigate(localPath)

  updateActiveNav: ->
    path = window.location.pathname.slice(1)

    @queryAll('.nav a[href]').forEach (aTag) ->
      aPath = aTag.pathname.slice(1)
      if !aPath and !path or aPath and path.indexOf(aPath) == 0
        dom.addClass aTag.parentNode, 'active'
      else
        dom.removeClass aTag.parentNode, 'active'
  
