
var Block = require('../models/block.js')

var blocks = {}

blocks.index  = function(request, response) {
	Block.find({},function(error,result) {
		response.json({'blocks':result})
	})
}

blocks.show = function(request, response) {
	var id = request.params.id
	Block.find({'_id':id},function(error,result) {
		response.json(result)
	})
}

blocks.create = function(request,response) {
	new_block = new Block({
		field   : request.body.field,
		temp_id : request.body.temp_id,
	})
	new_block.save(function(error,result) {
		if (error) {
			// console.log(500,error)
		} else {
			// console.log(201)
			response.json(result)
		}
	})
}

blocks.update = function(request, response) {
	var id    = request.params.id
	var query = request.body.query
	var patch = request.body.patch
	Block.findOne(query,function(error,found_block) {
		if (error) {
			response.json(error)
		} else {
			for (key in patch) {
				found_block[key] = patch[key]
			}
			found_block.save(function(error,saved_block) {
				response.json(saved_block)
			})
		}
	})
}

blocks.delete = function(request, response) {
	var id = request.params.id
	Block.remove({'_id':id},function(error,result) {
		if (error) {
			// console.log(500,error)
		} else {
			// console.log(201.9)
			response.json(result)
		}
	})
}

module.exports = blocks
