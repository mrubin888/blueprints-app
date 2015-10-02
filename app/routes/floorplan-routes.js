// ./app/floorplan-routes.js
var floorplanStore = require('../stores/floorplan-store');

var root = "/api/floorplans";

module.exports	= function(app) {
	app.get(root, function (req, res) {
		var floorplan_store	= new floorplanStore();
		
		// Probably want to put a limit on this if you ever expect your data size to be large
		floorplan_store.getAllFloorplans( function(err, result) {
			if (err) { return res.send(500, err); }
			else { return res.send(result); }
		});
	});
}