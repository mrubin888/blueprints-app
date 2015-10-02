var pg = require('pg');

var db_url = 'postgres://xpxjmkqkhcqavs:9hiOuy0G0bAPZVFvKBS63CgyLI@ec2-54-197-255-248.compute-1.amazonaws.com:5432/dfale3cel343e3?ssl=true';

var BlueprintStore = function () {};

BlueprintStore.prototype.getBlueprintsByOwnerId = function(owner_id, callback) {
	pg.connect(db_url, function(err, client, done) {
		if (err) {
			if (client !== null) { done(); }
			return callback (err);
		}
		client.query('SELECT blueprint_id, filename, created_date FROM blueprints WHERE owner_id=$1;', [owner_id], function (err, result) {
			done();
			if (err) { return callback (err); }
			return callback(null, result.rows);
		});
	});
};

BlueprintStore.prototype.createBlueprint = function(floorplan_id, filename, callback) {
	pg.connect(db_url, function(err, client, done) {
		if (err) {
			if (client !== null) { done(); }
			return callback (err);
		}
		client.query('INSERT INTO blueprints (owner_id, filename) VALUES ($1, $2);', [floorplan_id, filename], function (err, result) {
			done();
			if (err) { return callback (err); }
			return callback();
		});
	});
};

module.exports = BlueprintStore;