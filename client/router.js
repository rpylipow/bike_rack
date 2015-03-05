(function() {
  var HomePage, InfoPage, Router, app;

  app = require('ampersand-app');

  Router = require('ampersand-router');

  HomePage = require('./pages/home');

  InfoPage = require('./pages/info');

  module.exports = Router.extend({
    routes: {
      '': 'home',
      'info': 'info',
      '(*path)': 'catchAll'
    },
    home: function() {
      return app.trigger('page', new HomePage({
        model: app.me
      }));
    },
    info: function() {
      return app.trigger('page', new InfoPage({
        model: app.me
      }));
    },
    catchAll: function() {
      return this.redirectTo('');
    }
  });

}).call(this);
