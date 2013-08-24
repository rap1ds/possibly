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
    }
  });

  // Default task.
  grunt.registerTask('default', ['mochaTest']);
};