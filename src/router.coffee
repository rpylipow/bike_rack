app = require('ampersand-app')
Router = require('ampersand-router')
HomePage = require('./pages/home')
InfoPage = require('./pages/info')

module.exports = Router.extend
  routes:
    '': 'home'
    'info': 'info'
    '(*path)': 'catchAll'

  # ------- ROUTE HANDLERS ---------
  home: ->
    app.trigger('page', new HomePage({
        model: app.me
    }))

  info: ->
    app.trigger('page', new InfoPage({
      model: app.me
    }))

  catchAll: ->
    this.redirectTo('')
