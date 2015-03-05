(function() {
  var MainView, Router, app, bind, config, domReady;

  app = require('ampersand-app');

  bind = require('amp-bind');

  config = require('clientconfig');

  Router = require('./router');

  MainView = require('./views/main');

  domReady = require('domready');

  window.app = app;

  app.extend({
    router: new Router(),
    init: function() {
      this.mainView = new MainView({
        el: document.body
      });
      return this.router.history.start({
        pushState: true
      });
    },
    navigate: function(page) {
      var url;
      url = page.charAt(0) === '/' ? page.slice(1) : page;
      return this.router.history.navigate(url, {
        trigger: true
      });
    }
  });

  domReady(bind(app.init, app));

}).call(this);
