app = require('ampersand-app')
Router = require('ampersand-router')
HomePage = require('./pages/home')
InfoPage = require('./pages/info')
RacksCollection = require('./collections/racks_collection')

module.exports = Router.extend
  routes:
    '': 'home'
    'info': 'info'
    'search': 'search'
    '(*path)': 'catchAll'

  # ------- ROUTE HANDLERS ---------
  home: ->
    app.trigger('page', new HomePage({
      collection: new RacksCollection()
    }))

  info: ->
    app.trigger('page', new InfoPage())

  catchAll: ->
    this.redirectTo('')

