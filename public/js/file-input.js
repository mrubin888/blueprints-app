var fileList = [];

var handleFiles			= function (files) {
	fileList = files;
};

var fileListSubmit		= function () {
	console.log (fileList);
	
	var formData	= new FormData();
	if (fileList.length === 1) {
		formData.append("file", fileList[0]);
	}
	else {
		for (var i = 0; i < fileList.length; i++) {
			formData.append("files[]", fileList[i]);
		}
	}
	
	formData.append("title", document.getElementById("floorplan_name").value);
	
	postBlueprints(formData, function (err, data) {
		if (err) { updateStatusMessage("Failed to upload floorplan.", false, "upload_status"); }
		else {
			getFloorplans(function (err, data) {
				if (err) { updateStatusMessage("Failed to upload floorplan.", false, "upload_status"); }
				else {
					updateStatusMessage("Floorplan created successfully!", true, "upload_status");
					clearUploadView();
					clearOptionsView();
					generateOptionsView (data);
				}
			});
		}
	});
};

var viewFloorplanSubmit		= function () {
	var selector = document.getElementById("floorplan_selector"); 
	
	if (selector.selectedIndex === -1) {
		return;
	}
	
	var size_option = document.querySelector('input[name="image_size"]:checked').value;
	
	getBlueprintsForFloorplan( selector.options[selector.selectedIndex].value, size_option, function (err, data) {
		if (err) { updateStatusMessage("Failed to load blueprints for floorplan.", false, "view_status"); }
		else {
			updateStatusMessage("Success loading floorplan.", true, "view_status");
			clearImageView();
			generateImageView(selector.options[selector.selectedIndex].text, data);
		}
	});
};

var clearUploadView			= function () {
	var title_text = document.getElementById("floorplan_name");
	title_text.value = "";
	
	var file_input = document.getElementById("file_input");
	file_input.value = "";
};

var generateOptionsView		= function (floorplans) {
	var selector = document.getElementById("floorplan_selector"); 
	
	for(var i = 0; i < floorplans.length; i++) {
		var floorplan = floorplans[i];
		var newOption = document.createElement("option");
		newOption.textContent = floorplan.name
		newOption.value = floorplan.floorplan_id;
		selector.add(newOption);
	}
};

var clearOptionsView	= function () {
	var selector = document.getElementById("floorplan_selector");
	
	var length = selector.options.length;
	for (i = length - 1; i >= 0; i--) {
		selector.remove(i);
	}
};

var generateImageView		= function (floorplan_name, blueprints) {
	var title_text = document.getElementById("floorplan_title");
	title_text.textContent = floorplan_name;
	
	var container = document.getElementById("image_container");
	for (var i = 0; i < blueprints.length; i++) {
		var blueprint = blueprints[i];
		var newImage = document.createElement("img");
		newImage.src = blueprint.bucket_path + floorplan_name + "/" + blueprint.prefixed_filename;
		newImage.className = "loaded_image";
		container.appendChild(newImage);
	}
};

var clearImageView			= function () {
	var title_text = document.getElementById("floorplan_title");
	title_text.textContent = "";

	var container = document.getElementById("image_container");
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
};

var updateStatusMessage		= function (message, isSuccess, elementId) {
	var element = document.getElementById(elementId);
	console.log (element);
	
	element.className = isSuccess ? "success_text" : "error_text";
	element.textContent = message;
	console.log (element);
};

window.onload				= function () {
	getFloorplans(function (err, data) {
		if (err) { updateStatusMessage("Failed to load floorplan list.", false, "view_status"); }
		else {
			clearOptionsView();
			generateOptionsView (data);
		}
	});
};