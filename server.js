var Hapi = require('hapi');
var config = require('getconfig');
var MoonBootsHapi = require('moonboots_hapi');
var moonbootsConfig = require('./moonboots_config');

var server = new Hapi.Server();
//server.connection({ host: config.http.listen, port: config.http.port });
var herokuPort = process.env.PORT;
server.connection({ host: config.http.listen, port: herokuPort });

server.register([
  {
    register: MoonBootsHapi.register,
    options: moonbootsConfig
  }
], function (err) {
  if (err) throw err;
  server.start(function (err) {
    if (err) throw err;
    console.log('Bike Rack is running at: http://' + config.http.listen + ':' + herokuPort);
  });
});
