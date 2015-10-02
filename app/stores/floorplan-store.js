var pg = require('pg');

var db_url = 'postgres://xpxjmkqkhcqavs:9hiOuy0G0bAPZVFvKBS63CgyLI@ec2-54-197-255-248.compute-1.amazonaws.com:5432/dfale3cel343e3?ssl=true';

var FloorplanStore = function () {};

FloorplanStore.prototype.getAllFloorplans = function(callback) {
	pg.connect(db_url, function(err, client, done) {
		if (err) {
			if (client !== null) { done(); }
			return callback (err);
		}
		client.query('SELECT floorplan_id, name, created_date FROM floorplans;', [], function (err, result) {
			done();
			if (err) { return callback (err); }
			else if (result.rows.length === 0) { return callback ("No floorplans exist.") }
			return callback(null, result.rows);
		});
	});
};

FloorplanStore.prototype.createFloorplan = function(title, callback) {
	pg.connect(db_url, function(err, client, done) {
		if (err) {
			if (client !== null) { done(); }
			return callback (err);
		}
		client.query('INSERT INTO floorplans (name) VALUES ($1) RETURNING floorplan_id;', [title], function (err, result) {
			done();
			if (err) { return callback (err); }
			else if (result.rows.length === 0) { return callback ("Nothing was inserted."); }
			return callback(null, result.rows[0]);
		});
	});
};

module.exports = FloorplanStore;