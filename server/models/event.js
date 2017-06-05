var mongoose = require('mongoose')

var EventSchema = new mongoose.Schema({
	field : String,
},{	timestamps: { 
		createdAt: 'created_at', 
		updatedAt: 'updated_at',
	} 
});

mongoose.model('Event',EventSchema);

module.exports = mongoose.model('Event');
