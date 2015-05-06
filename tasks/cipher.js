/*
 * grunt-cipher
 * https://github.com/zzzhan/grunt-cipher
 *
 * Copyright (c) 2015 zzzhan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var cipher = require('./lib/cipher');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('cipher', 'Encrypt/Decrypt files', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      method:'encrypt'
    });
    if(!options.pk) {      
      grunt.fail.warn('Private key option unfound:pk');
    }
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });
      src.forEach(function(fp) {
        // Write the destination file.
        var dest = f.dest;
        grunt.file.write(f.dest, cipher[options.method](grunt.file.read(fp), options));
        // Print a success message.
        grunt.log.writeln('File "' + dest + '" created.');
      });
    });
  });

};
