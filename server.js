// Setup
var express		= require('express');
var app			= express();

var multer		= require('multer');

app.configure(function() {
			
	app.use(express.static(__dirname + '/public'));	
	app.use(express.logger('dev'));														// log requests to the console
	app.use(express.json());
	app.use(express.urlencoded());													// pull html info in POST
	app.use(express.methodOverride());
	app.use(multer({
		dest: './static/uploads/',
		rename: function (fieldname, filename) {
			return filename.replace(/\W+/g, '-').toLowerCase();
		}
	}));
});

require('./app/routes/blueprint-routes.js')(app);
require('./app/routes/floorplan-routes.js')(app);

// listen
var portNo = process.env.PORT || 80;
app.listen(portNo);
console.log("App listening on port " + portNo);
