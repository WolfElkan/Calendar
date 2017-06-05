var mongoose = require('mongoose')

var TaskSchema = new mongoose.Schema({
	field : String,
},{	timestamps: { 
		createdAt: 'created_at', 
		updatedAt: 'updated_at',
	} 
});

mongoose.model('Task',TaskSchema);

module.exports = mongoose.model('Task');
