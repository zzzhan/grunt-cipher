'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.cipher = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  defTest: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/decrypted/fixtures/test.png');
    var expected = grunt.file.read('test/fixtures/test.png');
    test.equal(actual, expected, 'decrypted file not the same to original');

    test.done();
  },
  encoding1Test: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/decrypted/fixtures/123');
    var expected = grunt.file.read('test/fixtures/123');
    test.equal(actual, expected, 'decrypted file not the same to original');

    test.done();
  },
  encoding2Test: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/decrypted/fixtures/testing');
    var expected = grunt.file.read('test/fixtures/testing');
    test.equal(actual, expected, 'decrypted file not the same to original');

    test.done();
  }
};
