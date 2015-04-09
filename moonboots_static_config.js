var moonbootsConfig = require('./moonboots_config');
var MoonbootsStatic = require('moonboots-static');

module.exports = new MoonbootsStatic({
  moonboots: moonbootsConfig.moonboots,
  public: __dirname + '/stylesheets',
  directory: __dirname + '/_build',
  verbose: true
});
