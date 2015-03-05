var Hapi = require('hapi');
var config = require('getconfig');
var MoonBootsHapi = require('moonboots_hapi');
var moonbootsConfig = require('./moonbootsConfig');

var server = new Hapi.Server();
server.connection({ host: config.http.listen, port: config.http.port });

server.register([
  {
    register: MoonBootsHapi.register,
    options: moonbootsConfig
  }
], function (err) {
  if (err) throw err;
  server.start(function (err) {
    if (err) throw err;
    console.log('Rdio Client App is running at: http://' + config.http.listen + ':' + config.http.port);
  });
});
