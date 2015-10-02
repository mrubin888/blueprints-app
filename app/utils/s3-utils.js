var fs = require('fs');
var async = require('async');

var AWS = require('aws-sdk');

AWS.config.loadFromPath('awsconfig.json');
var s3 = new AWS.S3();
var BUCKET = "fieldwire";

var s3_utils = {
	uploadFilelistFromPath: function(names, srcPath, destPath, callback) {
		async.each(names,
		
			function (name, callback) {
				fs.readFile (srcPath+name, function (err, data) {
					if (err) {
						return callback(err);
					}
					s3.putObject({ Bucket: BUCKET, Key: destPath + name, Body: data}, function(err, data) {
						if (err) {
							return callback(err);
						}
						return callback();
					});
				});
			},
			
			function (err, result) {
				return callback (err, result);
			}
			
		);
	}
};

module.exports = s3_utils;