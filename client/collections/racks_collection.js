(function() {
  var Collection, RackModel;

  Collection = require('ampersand-rest-collection');

  RackModel = require('../models/rack_model');

  module.exports = Collection.extend({
    model: RackModel,
    setParams: function(neighborhood) {
      console.log(neighborhood);
      return this.url = "https://data.cityofchicago.org/resource/cbyb-69xx.json?community_name=" + neighborhood;
    }
  });

}).call(this);
