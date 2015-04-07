module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      glob_to_multiple: {
        expand: true,
        flatten: false,
        cwd: 'src',
        src: ['*.coffee', '**/*.coffee'],
        dest: 'client/',
        ext: '.js'
      }
    },
    watch: {
      scripts: {
        files: ['src/*.coffee', 'src/**/*.coffee'],
        tasks: ['coffee']
      }
    },
    clean: {
      js: [ 
            'client/*.js', 
            'client/pages/*.js', 
            'client/views/*.js', 
            'client/models/*.js', 
            'client/collections/*.js', 
            '!client/templates.js'
          ]
    }
  });

  var gruntPackages = [ 
                        'grunt-contrib-coffee', 
                        'grunt-contrib-watch', 
                        'grunt-contrib-clean',
                      ];

  gruntPackages.forEach( grunt.loadNpmTasks );                  

  grunt.registerTask('default', ['clean', 'coffee']);
};
