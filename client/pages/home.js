(function() {
  var View, templates;

  View = require('ampersand-view');

  templates = require('../templates');

  module.exports = View.extend({
    pageTitle: 'home',
    template: templates.pages.home
  });

}).call(this);
