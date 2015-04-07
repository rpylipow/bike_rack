(function() {
  var Model;

  Model = require('ampersand-model');

  module.exports = Model.extend({
    props: {
      community_name: 'string',
      address: 'string',
      location: {
        latitude: 'string',
        longitude: 'string'
      }
    },
    derived: {
      thing: {
        deps: ['address'],
        fn: function() {
          console.log(this);
          return this.address;
        }
      }
    }
  });

}).call(this);
