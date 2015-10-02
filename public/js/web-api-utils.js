var getFloorplans		= function (callback) {
	var request		= new XMLHttpRequest();
	request.open('GET', '/api/floorplans/', true);
	
	request.onload	= function() {
		if (request.status === 200) {
			var res = request.responseText;
			callback(null, JSON.parse(res));
		}
		else {
			callback("Failed to get floorplans.");
			console.warn ("Request failed with status code ", request.status);
		}
	};
	
	request.onerror	= function() {
		callback("Failed to get floorplans.");
		console.warn ("Connection error.");
	};
	
	request.send();
};

var getBlueprintsForFloorplan	= function (floorplan_id, size_option, callback) {
	var request		= new XMLHttpRequest();
	request.open('GET', '/api/blueprints/' + floorplan_id + '?size_option=' + size_option, true);
	
	request.onload	= function() {
		if (request.status === 200) {
			var res = request.responseText;
			callback(null, JSON.parse(res));
		}
		else {
			callback("Failed to get blueprints.");
			console.warn ("Request failed with status code ", request.status);
		}
	};
	
	request.onerror	= function() {
		callback("Failed to get blueprints.");
		console.warn ("Connection error.");
	};
	
	request.send();
};

var postBlueprints		= function (formData, callback) {
	console.log (formData);
	var request		= new XMLHttpRequest();
	request.open('POST', '/api/blueprints/', true);
	
	request.onload	= function() {
		console.log ("onload");
		if (request.status === 200) {
			var res = request.responseText;
			console.log ("Success: ", res);
			
			return callback();
		}
		else {
			callback("Failed to post blueprints.");
			console.warn ("Request failed with status code ", request.status);
		}
	};
	
	request.onerror	= function() {
		callback("Failed to post blueprints.");
		console.warn ("Connection error.");
	};
	
	request.send(formData);
};