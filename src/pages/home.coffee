View = require('ampersand-view')
templates = require('../templates')
mapbox = require('mapbox.js')
$ = require('jquery')

module.exports = View.extend
  pageTitle: 'home'
  template: templates.pages.home
  events:
    'click a' : 'populateRacks'

  render: ->
    @renderWithTemplate()
    @initGeolocation()

  initGeolocation: ->  
    $(@el).find('.spinner').addClass('visible')
    if navigator.geolocation
      navigator.geolocation.getCurrentPosition(@buildMap, @locationFail )
    else
      alert("Sorry, your browser does not support geolocation services.");
    
  buildMap: (position) ->    
    L.mapbox.accessToken = 'pk.eyJ1IjoicnB5bGlwb3ciLCJhIjoiMExyYUpnbyJ9.9CptOCTd472VpgLJcf9D2w';
    @map = L.mapbox.map('map', 'rpylipow.lih5p3pp')
    lat = position.coords.latitude
    lon = position.coords.longitude
    
    @map.setView([lat, lon], 10)

    L.marker([lat, lon], {
      icon: L.mapbox.marker.icon({
          'marker-size': 'large',
          'marker-color': '#fa0'
      })
    }).addTo(@map)
    $(@el).find('.spinner').removeClass('visible')

  locationFail: -> 

  populateRacks: (e) ->
    @collection.setParams('loop')
    @collection.fetch(
      success: (collection) =>
        @doThing(collection)
    )

  doThing: (collection) ->
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
