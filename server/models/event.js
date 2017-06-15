var mongoose = require('mongoose')
var Schema = mongoose.Schema

var EventSchema = new Schema({
	title : String,
	color : Number, // min=0, max=2**24-1
	timeS : Date,
	timeE : Date,
},{	timestamps: { 
		createdAt: 'created_at', 
		updatedAt: 'updated_at',
	} 
});

mongoose.model('Event',EventSchema);

module.exports = mongoose.model('Event');
