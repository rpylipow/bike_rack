View = require('ampersand-view')
templates = require('../templates')
mapbox = require('mapbox.js')
$ = require('jquery')

module.exports = View.extend
  pageTitle: 'Chicago Bike Racks'
  template: templates.pages.home
  events:
    'click a' : 'getRacks'

  render: ->
    @renderWithTemplate()
    @getRacks()

  initGeolocation: ->  
    # $(@el).find('.spinner').removeClass('visible')
    # if navigator.geolocation
    #   navigator.geolocation.getCurrentPosition(@buildMap, @locationFail )
    # else
    #   alert("Sorry, your browser does not support geolocation services.");
    
  buildMap: (position) ->    
    # L.mapbox.accessToken = 'pk.eyJ1IjoicnB5bGlwb3ciLCJhIjoiMExyYUpnbyJ9.9CptOCTd472VpgLJcf9D2w';
    # @map = L.mapbox.map('map', 'rpylipow.lih5p3pp')
    # lat = position.coords.latitude
    # lon = position.coords.longitude
    
    # @map.setView([lat, lon], 10)

    # L.marker([lat, lon], {
    #   icon: L.mapbox.marker.icon({
    #       'marker-size': 'large',
    #       'marker-color': '#fa0'
    #   })
    # }).addTo(@map)
    # $(@el).find('.spinner').removeClass('visible')

  locationFail: -> 

  getRacks: (e) ->
    $(@el).find('.spinner').addClass('visible')
    @collection.setParams('loop')
    @collection.fetch(
      success: (collection) =>
        $.when(@renderRacksMap(collection)).done =>
          $(@el).find('.spinner').removeClass('visible')
    )

  renderRacksMap: (collection) ->
    L.mapbox.accessToken = 'pk.eyJ1IjoicnB5bGlwb3ciLCJhIjoiMExyYUpnbyJ9.9CptOCTd472VpgLJcf9D2w';
    @map = L.mapbox.map('map', 'rpylipow.lih5p3pp')
    for location in collection.models
      lon = location._values.location.longitude
      lat = location._values.location.latitude
      L.marker([lat, lon], {
        icon: L.mapbox.marker.icon({
            'marker-size': 'large',
            'marker-color': '#fa0'
        })
      }).addTo(@map)
