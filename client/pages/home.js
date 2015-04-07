(function() {
  var $, View, mapbox, templates;

  View = require('ampersand-view');

  templates = require('../templates');

  mapbox = require('mapbox.js');

  $ = require('jquery');

  module.exports = View.extend({
    pageTitle: 'Chicago Bike Racks',
    template: templates.pages.home,
    events: {
      'click a': 'getRacks'
    },
    render: function() {
      this.renderWithTemplate();
      return this.getRacks();
    },
    initGeolocation: function() {},
    buildMap: function(position) {},
    locationFail: function() {},
    getRacks: function(e) {
      $(this.el).find('.spinner').addClass('visible');
      this.collection.setParams('loop');
      return this.collection.fetch({
        success: (function(_this) {
          return function(collection) {
            return $.when(_this.renderRacksMap(collection)).done(function() {
              return $(_this.el).find('.spinner').removeClass('visible');
            });
          };
        })(this)
      });
    },
    renderRacksMap: function(collection) {
      var i, lat, len, location, lon, ref, results;
      L.mapbox.accessToken = 'pk.eyJ1IjoicnB5bGlwb3ciLCJhIjoiMExyYUpnbyJ9.9CptOCTd472VpgLJcf9D2w';
      this.map = L.mapbox.map('map', 'rpylipow.lih5p3pp');
      ref = collection.models;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        location = ref[i];
        lon = location._values.location.longitude;
        lat = location._values.location.latitude;
        results.push(L.marker([lat, lon], {
          icon: L.mapbox.marker.icon({
            'marker-size': 'large',
            'marker-color': '#fa0'
          })
        }).addTo(this.map));
      }
      return results;
    }
  });

}).call(this);
