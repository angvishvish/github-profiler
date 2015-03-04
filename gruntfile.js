module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          'bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-route/angular-route.js',
          'app.js',
          'github/github.js',
          'github/github-user.js',
          'github/github-repo.js',
          'github/github-repo-details.js'
        ],
        dest: 'app/<%= pkg.name %>.add.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
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