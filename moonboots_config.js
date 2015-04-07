var config = require('getconfig');
var stylizer = require('stylizer');
var templatizer = require('templatizer');

var bowerDir = __dirname + '/bower_components';
var appDir = __dirname + '/client';
var cssDir = __dirname + '/stylesheets';

module.exports = {
  appPath: '/{p*}',
  moonboots: {
    jsFileName: 'bike',
    cssFileName: 'bike',
    main: appDir + '/app.js',
    developmentMode: config.isDev,
    buildDirectory: __dirname + '/_build',
    libraries: [],
    stylesheets: [
      bowerDir + '/skeleton/css/normalize.css',
      bowerDir + '/skeleton/css/skeleton.css',
      cssDir + '/app.css'
    ],
    browserify: {
      debug: config.isDev
    },
    beforeBuildJS: function () {
      if (config.isDev) {
        templatizer(__dirname + '/templates', appDir + '/templates.js');
      }
    },
    beforeBuildCSS: function (done) {
      // We only want to do this in dev mode. If it's not in dev mode, this
      // function will only be run once.
      if (!config.isDev) {
        done();
        return;
      }
      stylizer({
        infile: cssDir + '/app.styl',
        outfile: cssDir + '/app.css',
        development: true,
        watch: cssDir + '/**/*.styl'
      }, done);
    }
  }
};
