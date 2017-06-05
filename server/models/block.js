var mongoose = require('mongoose')

var BlockSchema = new mongoose.Schema({
	field : String,
},{	timestamps: { 
		createdAt: 'created_at', 
		updatedAt: 'updated_at',
	} 
});

mongoose.model('Block',BlockSchema);

module.exports = mongoose.model('Block');
