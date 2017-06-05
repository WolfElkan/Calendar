// require mongoose
var mongoose = require('mongoose');

// configure mongoose promises
mongoose.Promise = global.Promise;

// require the fs module for loading model files
var fs = require('fs');

// require path for getting the models path
var path = require('path');

// connect to mongoose!
mongoose.connect('mongodb://localhost/Calendar');

// create a variable that points to the path where all of the models live
var models_path = path.join(__dirname, './../models');

// read all of the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach(function(file) {

	if (file.indexOf('.js') >= 0) {
		// require the file (this runs the model file which registers the schema)
		require(models_path + '/' + file);
	}

});

module.exports = mongoose
