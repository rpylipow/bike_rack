Collection = require('ampersand-rest-collection')
RackModel = require('../models/rack_model')

module.exports = Collection.extend
  model: RackModel

  setParams: (neighborhood) ->
    console.log neighborhood
    @url = "https://data.cityofchicago.org/resource/cbyb-69xx.json?community_name=#{neighborhood}"

  
