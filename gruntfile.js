module.exports = function(grunt) {

  grunt.initConfig({
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
          'assets/js/jquery.js',
          'assets/js/highcharts.js',
          'assets/js/highcharts-exporting.js',
          'app.js',
          'github/github.js',
          'github-user/github-user.js',
          'github-repo/github-repo.js',
          'github-repo-details/github-repo-details.js',
          'github-repo-details/repo-language.js'
        ],
        dest: 'assets/js/github-viewer.add.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'assets/js/github-viewer.min.js': [
            'assets/js/github-viewer.add.js'
          ]
        }
      }
    },
    less: {
      debug: {
        src: [
          'bower_components/html5-boilerplate/css/normalize.css',
          'bower_components/components-font-awesome/less/font-awesome.less',
          'app.less'
        ],
        dest: 'assets/css/styles.css'
      }
    },
    cssmin: {
      'assets/css/styles.css': [
        'assets/css/styles.css'
      ]
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.registerTask('js', ['concat', 'uglify']);
  grunt.registerTask('css', ['less', 'cssmin']);
};
