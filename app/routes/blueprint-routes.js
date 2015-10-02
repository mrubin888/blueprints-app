// ./app/blueprint-routes.js
var async = require('async');
var sanitize = require('sanitize-filename');

var floorplanStore = require('../stores/floorplan-store');
var blueprintStore = require('../stores/blueprint-store');


var imageUtils = require('../utils/image-utils');
var s3Utils = require('../utils/s3-utils');

var root = "/api/blueprints";

module.exports	= function(app) {
	app.get(root + "/:floorplan_id", function (req, res) {
		var blueprint_store = new blueprintStore();
		blueprint_store.getBlueprintsByOwnerId(req.params.floorplan_id, function (err, result) {
			if (err) { return res.send(500, "Failed to get blueprints"); }
			
			if (result) {
				for (var i = 0; i < result.length; i++) {
					result[i].prefixed_filename = imageUtils.appendSizeOptionPrefixToFilename(result[i].filename, req.query.size_option);
					result[i].bucket_path = "https://s3-us-west-1.amazonaws.com/fieldwire/";
				}
			}
			
			return res.send(200, result);
		});
	});
	
	app.post(root, function (req, res) {
		var floorplan_store = new floorplanStore();
		var blueprint_store = new blueprintStore();
	
		var files = req.files['files[]'] ? req.files['files[]'] : [req.files['file']];
		if (!files || !files[0]) {
			return res.send(500, "No files provided");
		}
		
		var title = req.body.title;
		title = title.replace(/\s/g, '-');
		var sanitized_title = sanitize(title);
		
		floorplan_store.createFloorplan(sanitized_title, function (err, result) {
			if (err) { return res.send(500, "Failed to create floorplan with error: " + err); }
			if (!result) { return res.send(500, "Floorplan already exists.") }
			
			var new_floorplan_id = result.floorplan_id;
		
			async.each(files,
			
				function(file, callback) {
					blueprint_store.createBlueprint( new_floorplan_id, file.name, function (err, result) {
						if (err) { return callback("Failed to create blueprint in postgres with error: " + err); }
						
						var small_file_name = 'thumbnail_' + file.name;
						var large_file_name = 'large_' + file.name;
						
						imageUtils.resizeImageToThumbnailAndLarge("./static/uploads/", file.name, small_file_name, large_file_name, function(err) {
							if (err) { return callback("Failed to resize images with error: " + err); }
							
							s3Utils.uploadFilelistFromPath([file.name, small_file_name, large_file_name], "./static/uploads/", sanitized_title+"/", function(err) {
								if (err) { return callback("Failed to uplaod image to S3 with error: " + err); }
								return callback();
							});
						});
					});
				},
				
				function(err, result) {
					if (err) { return res.send(500, err); }
					else { return res.send(200, "Successful async calls"); }
				}
				
			);
		});
	});
}