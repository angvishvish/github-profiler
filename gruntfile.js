module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          'bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-route/angular-route.js',
          'bower_components/angular-ui-router/release/angular-ui-router.min.js',
          'bower_components/angular-resource/angular-resource.js',
          'bower_components/angular-bootstrap/ui-bootstrap.js',
          'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
          'assets/jquery.js',
          'assets/highcharts.js',
          'assets/highcharts-exporting.js',
          'app.js',
          'github/github.js',
          'github/github-user.js',
          'github/github-repo.js',
          'github/github-repo-details.js',
          'repo-language.js'
        ],
        dest: 'app/<%= pkg.name %>.add.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'github-viewer.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    less: {
      debug: {
        src: 'app.less',
        dest: 'styles.css'
      }
    },
    cssmin: {
      'styles.css': [
        'styles.css'
      ]
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.registerTask('default', ['concat', 'uglify', 'less', 'cssmin']);
};