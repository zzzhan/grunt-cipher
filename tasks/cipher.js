/*
 * grunt-cipher
 * https://github.com/zzzhan/grunt-cipher
 *
 * Copyright (c) 2015 zzzhan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var cipher = require('./lib/cipher'),
  fs = require('fs');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('cipher', 'Encrypt/Decrypt files', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      method:'encrypt',
      force: false,
      random: false,
      inputEncoding:'binary',
      outputEncoding:'binary'
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
          return !grunt.file.isDir(filepath);
        }
      });
      src.forEach(function(fp) {
        // Write the destination file.
        var dest = f.dest;
        var srcCode = null;
        try {		  
	      if(grunt.file.exists(f.dest)) {
            var stats  = fs.statSync(fp);
		    var destStats  = fs.statSync(f.dest);
		    if(destStats['mtime'].getTime()>=stats['mtime'].getTime()) {
			  grunt.log.writeln('File "' + dest + '" skipped with latest.');
			  return;        
		    }
		  }
          srcCode = cipher[options.method](grunt.file.read(fp, {encoding:'binary'}), options);
        } catch (e) {
          var err = new Error(options.method + ' failed.');
          err.origError = e;
          grunt.fail.warn(err);
        }
        var write = true;
        if(grunt.file.exists(f.dest)) {
          var destCode = grunt.file.read(f.dest, {encoding:'binary'});
          if(srcCode===destCode&&!options.force) {
            write = false;
          }
        }
        if(write) {
          grunt.file.write(f.dest, srcCode, {encoding:'binary'});
          // Print a success message.
          grunt.log.writeln('File "' + dest + '" created.');
        } else {          
          grunt.log.writeln('File "' + dest + '" skipped with no changes.');
        }
      });
    });
  });
};
