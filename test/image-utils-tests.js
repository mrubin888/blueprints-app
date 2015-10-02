var gm = require('gm').subClass({ imageMagick: true });
var assert  = require('assert');

var image_utils = require('../app/utils/image-utils');

describe('appendSizeOptionPrefixToFilename', function () {
	describe('given no size option', function () {
		it('append nothing', function (done) {
			var newFileName = image_utils.appendSizeOptionPrefixToFilename('testfile.png', '');
			assert.equal(newFileName, 'testfile.png');
			done();
		});
	});
	describe('given invalid size option', function () {
		it('append nothing', function (done) {
			var newFileName = image_utils.appendSizeOptionPrefixToFilename('testfile.png', 'funsized');
			assert.equal(newFileName, 'testfile.png');
			done();
		});
	});
	describe('given thumbnail size option', function () {
		it('append thumbnail_ prefix', function (done) {
			var newFileName = image_utils.appendSizeOptionPrefixToFilename('testfile.png', 'thumbnail');
			assert.equal(newFileName, 'thumbnail_testfile.png');
			done();
		});
	});
	describe('given large size option', function () {
		it('append large_ prefix', function (done) {
			var newFileName = image_utils.appendSizeOptionPrefixToFilename('testfile.png', 'large');
			assert.equal(newFileName, 'large_testfile.png');
			done();
		});
	});
});

describe('resizeImageToThumbnailAndLarge', function () {
	describe('given valid input file', function () {
		it('create a 100x100 and a 2000x2000 file', function(done) {
			var path = "./test/assets/";
			
			var filename = "testfile.jpg";
			var thumbnail_filename = "thumbnail_testfile.jpg";
			var large_filename = "large_testfile.jpg";
			
			image_utils.resizeImageToThumbnailAndLarge(path, filename, thumbnail_filename, large_filename, function(err) {
				if (err) { throw new Error(err); }
				else {
					gm(path + thumbnail_filename)
					.size(function (err, size) {
						if (err) { throw new Error(err); }
						assert(size.width === 100 || size.height === 100);
						gm(path + large_filename)
						.size(function (err, size) {
							if (err) { throw new Error(err); }
							assert(size.width === 2000 || size.height === 2000);
							done();
						});
					});
				}
			});
		});
	});
});