(function() {
  var $, View, mapbox, templates;

  View = require('ampersand-view');

  templates = require('../templates');

  mapbox = require('mapbox.js');

  $ = require('jquery');

  module.exports = View.extend({
    pageTitle: 'home',
    template: templates.pages.home,
    events: {
      'click a': 'populateRacks'
    },
    render: function() {
      this.renderWithTemplate();
      return this.initGeolocation();
    },
    initGeolocation: function() {
      $(this.el).find('.spinner').addClass('visible');
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(this.buildMap, this.locationFail);
      } else {
        return alert("Sorry, your browser does not support geolocation services.");
      }
    },
    buildMap: function(position) {
      var lat, lon;
      L.mapbox.accessToken = 'pk.eyJ1IjoicnB5bGlwb3ciLCJhIjoiMExyYUpnbyJ9.9CptOCTd472VpgLJcf9D2w';
      this.map = L.mapbox.map('map', 'rpylipow.lih5p3pp');
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      this.map.setView([lat, lon], 10);
      L.marker([lat, lon], {
        icon: L.mapbox.marker.icon({
          'marker-size': 'large',
          'marker-color': '#fa0'
        })
      }).addTo(this.map);
      return $(this.el).find('.spinner').removeClass('visible');
    },
    locationFail: function() {},
    populateRacks: function(e) {
      this.collection.setParams('loop');
      return this.collection.fetch({
        success: (function(_this) {
          return function(collection) {
            return _this.doThing(collection);
          };
        })(this)
      });
    },
    doThing: function(collection) {
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
