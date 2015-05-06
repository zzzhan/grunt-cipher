/*!
 * grunt-cipher
 * https://github.com/zzzhan/grunt-cipher
 *
 * Licensed under the MIT license.
 *
 */
'use strict';
var _ALGORITHM = 'AES-256-CBC';
var crypto = require("crypto");
exports.encrypt = function (data, options) {
	var pk = null;
	if(typeof options === 'string') {
		pk = options;
		options = {};
	} else {
		pk = options.pk;
	}
	var algorithm = options.algorithm||_ALGORITHM;
	var outputEncoding = options.outputEncoding||'hex';
	var inputEncoding = options.inputEncoding||'utf8';
	var seperator = options.seperator||'$';
    var random_KEY = crypto.randomBytes(Math.ceil(32 / 2)).toString(outputEncoding).slice(0, 32);
    var cipher_KEY = crypto.createCipher(algorithm,new Buffer(pk, 'ASCII'));
    var KEY = cipher_KEY.update(random_KEY,inputEncoding,outputEncoding);
    KEY += cipher_KEY.final(outputEncoding);
    var cipher = crypto.createCipher(algorithm,random_KEY);
    var crypted = cipher.update(data,inputEncoding,outputEncoding);
    crypted += cipher.final(outputEncoding);
    return crypted + seperator + KEY;
};
exports.decrypt = function (data, options) {
	var pk = null;
	if(typeof options === 'string') {
		pk = options;
		options = {};
	} else {
		pk = options.pk;
	}
	var algorithm = options.algorithm||_ALGORITHM;
	var outputEncoding = options.outputEncoding||'utf8';
	var inputEncoding = options.inputEncoding||'hex';
	var seperator = options.seperator||'$';
    var cipher_blob = data.split(seperator);
    var decipher_key = crypto.createDecipher(algorithm,new Buffer(pk, 'ASCII'));
    var KEY = decipher_key.update(cipher_blob[1],inputEncoding,outputEncoding);
    KEY += decipher_key.final(outputEncoding);
    var decipher = crypto.createDecipher(algorithm,KEY);
    var dec = decipher.update(cipher_blob[0],inputEncoding,outputEncoding);
    dec += decipher.final(outputEncoding);
    return dec;
};