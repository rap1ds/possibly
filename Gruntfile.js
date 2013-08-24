/*jshint node:true */
module.exports = function(grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Project configuration.
  grunt.initConfig({
    mochaTest: {
      files: ['test/**/*.js']
    },
    lint: {
      files: ['Gruntfile', 'lib/**/*.js', 'test/**/*.js']
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: false,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      },
      globals: {
        it: true,
        describe: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'mochaTest']);
};