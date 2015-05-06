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
	var random = options.random||false;
	var keyBuf = new Buffer(pk, 'ASCII');
	var finalKey = null;
	var append = '';
	if(random) {
		finalKey = crypto.randomBytes(Math.ceil(32 / 2)).toString(outputEncoding).slice(0, 32);
		var cipher_KEY = crypto.createCipher(algorithm,keyBuf);
		var key = cipher_KEY.update(finalKey,inputEncoding,outputEncoding);
		key += cipher_KEY.final(outputEncoding);
		append = seperator + key;
	} else {
		finalKey = keyBuf;
	}
    var cipher = crypto.createCipher(algorithm,finalKey);
    var crypted = cipher.update(data,inputEncoding,outputEncoding);
    crypted += cipher.final(outputEncoding);
    return crypted + append;
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
	var random = options.random||false;
	var keyBuf = new Buffer(pk, 'ASCII');
	var finalKey = null;
	var cipherBlob = null;
	if(random) {
		var cipherBlobs = data.split(seperator);
		if(cipherBlobs.length>1) {
			var decipher_key = crypto.createDecipher(algorithm,keyBuf);
			finalKey = decipher_key.update(cipherBlobs[1],inputEncoding,outputEncoding);
			finalKey += decipher_key.final(outputEncoding);
			cipherBlob = cipherBlobs[0];
		} else {			
			finalKey = keyBuf;
			cipherBlob = data;
		}
	} else {
		finalKey = keyBuf;
		cipherBlob = data;
	}
    var decipher = crypto.createDecipher(algorithm,finalKey);
    var dec = decipher.update(cipherBlob,inputEncoding,outputEncoding);
    dec += decipher.final(outputEncoding);
    return dec;
};