/*
 * grunt-cipher
 * https://github.com/zzzhan/grunt-cipher
 *
 * Copyright (c) 2015 zzzhan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'tasks/lib/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    // On real project, don't commit the private key file ".pk".
    cipher: {
      options: {
        pk:grunt.cli.options.pk||grunt.file.read('.pk')
      },
      def_encrypt: {
        options: {
        },
        files: [{
          expand:true,
          cwd:'test/',
          src:['fixtures/test.png'],
          dest:'tmp/encrypted/'
        }]
      },      
      def_decrypt: {
        options: {
          method:'decrypt'
        },
        files: [{
          expand:true,
          cwd:'tmp/encrypted/',
          src:['fixtures/test.png'],
          dest:'tmp/decrypted/'
        }]
      },
      encoding1_encrypt: {
        options: {
          inputEncoding:'utf8',
          outputEncoding:'hex'
        },
        files: [{
          expand:true,
          cwd:'test/',
          src:['fixtures/123'],
          dest:'tmp/encrypted/'
        }]
      },      
      encoding1_decrypt: {
        options: {
          method:'decrypt',
          inputEncoding:'hex',
          outputEncoding:'utf8'
        },
        files: [{
          expand:true,
          cwd:'tmp/encrypted/',
          src:['fixtures/123'],
          dest:'tmp/decrypted/'
        }]
      },
      encoding2_encrypt: {
        options: {
          inputEncoding:'binary',
          outputEncoding:'base64'
        },
        files: [{
          expand:true,
          cwd:'test/',
          src:['fixtures/testing'],
          dest:'tmp/encrypted/'
        }]
      },      
      encoding2_decrypt: {
        options: {
          method:'decrypt',
          inputEncoding:'base64',
          outputEncoding:'binary'
        },
        files: [{
          expand:true,
          cwd:'tmp/encrypted/',
          src:['fixtures/testing'],
          dest:'tmp/decrypted/'
        }]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  //test the option[force],whether the dest file would be rewrite nor not.
  grunt.registerTask('testforce', ['cipher']);
  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'cipher', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
