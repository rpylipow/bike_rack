(function() {
  var HomePage, InfoPage, RacksCollection, Router, app;

  app = require('ampersand-app');

  Router = require('ampersand-router');

  HomePage = require('./pages/home');

  InfoPage = require('./pages/info');

  RacksCollection = require('./collections/racks_collection');

  module.exports = Router.extend({
    routes: {
      '': 'home',
      'info': 'info',
      'search': 'search',
      '(*path)': 'catchAll'
    },
    home: function() {
      return app.trigger('page', new HomePage({
        collection: new RacksCollection()
      }));
    },
    info: function() {
      return app.trigger('page', new InfoPage());
    },
    catchAll: function() {
      return this.redirectTo('');
    }
  });

}).call(this);
