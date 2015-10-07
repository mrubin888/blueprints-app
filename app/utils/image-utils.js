var async 		= require('async');
var pathNode	= require('path');
var exec		= require('child_process').exec;

var gm 			= require('gm').subClass({ imageMagick: true });

var image_utils = {
	splitPDFsIntoJPGs: function(path, files, callback) {
		var indexRemoveList = [];
		var scopedFiles = files.slice(0);
		console.log (scopedFiles);
		
		async.each(scopedFiles,
		
			function(file, callback) {
				if (pathNode.extname(file.name) === '.pdf') {
					console.log ("is pdf");
					exec('identify -format %n ' + path + file.name, function (error, stdout, stderr) {
						if (error !== null) { console.log("identify err", err); return callback(err); }
						indexRemoveList.push(scopedFiles.indexOf(file));
						var name = file.name.substring(0, file.name.length - 4);
						var numPages = stdout;
						exec('convert -density 200 ' + path + file.name + ' -page +0+0 +adjoin ' + path + name + '%d.jpg', function (error, stdout, stderr) {
							if (error !== null) { console.log (err); return callback(err); }
							for (var i = 0; i < numPages; i++) {
								scopedFiles.push({'name' : name + i + '.jpg'});
							}
							return callback();
						});
					});
				}
				else {
					console.log ("not pdf");
					return callback();
				}
			},
			
			function(err, result) {
				if (err) { return callback(err); }
				console.log (scopedFiles);
				indexRemoveList.sort(function (a, b) { return b-a; });
				for (var i = 0; i < indexRemoveList.length; i++) {
					scopedFiles.splice(indexRemoveList[i], 1);
				}
				console.log (scopedFiles);
				return callback(null, scopedFiles);
			}
			
		);
	},

	appendSizeOptionPrefixToFilename: function(filename, size_option) {
		console.log (size_option);
		switch (size_option) {
			case "thumbnail":
				return "thumbnail_" + filename;
				
			case "large":
				return "large_" + filename;
				
			default:
				return filename;
		}
	},

	resizeImageToThumbnailAndLarge: function(path, srcName, thumbnailName, largeName, callback) {
		gm(path + srcName)
			.resize(100, 100)
			.write(path + thumbnailName, function (err) {
				if (err) { console.trace (err); return callback(err); }
				gm(path + srcName)
					.resize(2000, 2000)
					.write(path + largeName, function (err) {
						if (err) { console.error("Error resizing " + srcName); console.trace (err); return callback(err); }
						return callback();
					});
			});
	}
};

module.exports = image_utils;