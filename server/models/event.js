var mongoose = require('mongoose')
var Schema = mongoose.Schema

var EventSchema = new Schema({
	title : String,
	color : String,
	start : Date,
	end   : Date,
},{	timestamps: { 
		createdAt: 'created_at', 
		updatedAt: 'updated_at',
	} 
});

mongoose.model('Event',EventSchema);

module.exports = mongoose.model('Event');
