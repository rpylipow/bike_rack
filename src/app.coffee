app = require('ampersand-app')
bind = require('amp-bind')
config = require('clientconfig')
Router = require('./router')
MainView = require('./views/main')
domReady = require('domready')

window.app = app

app.extend({
  router: new Router()
  init: -> 
    @mainView = new MainView({
      el: document.body
    })

    @router.history.start({ pushState: true })
  
  navigate: (page) ->
    url = if page.charAt(0) == '/' then page.slice(1) else page
    @router.history.navigate(url, {
        trigger: true
    })
})

domReady(bind(app.init, app))
