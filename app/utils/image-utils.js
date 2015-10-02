var gm = require('gm').subClass({ imageMagick: true });

var image_utils = {
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
				if (err) { return callback(err); }
				gm(path + srcName)
					.resize(2000, 2000)
					.write(path + largeName, function (err) {
						if (err) { return callback(err); }
						return callback();
					});
			});
	}
};

module.exports = image_utils;