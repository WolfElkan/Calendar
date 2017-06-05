
var Task = require('../models/task.js')

var tasks = {}

tasks.index  = function(request, response) {
	Task.find({},function(error,result) {
		response.json({'tasks':result})
	})
}

tasks.show = function(request, response) {
	var id = request.params.id
	Task.find({'_id':id},function(error,result) {
		response.json(result)
	})
}

tasks.create = function(request,response) {
	new_task = new Task({
		field   : request.body.field,
		temp_id : request.body.temp_id,
	})
	new_task.save(function(error,result) {
		if (error) {
			// console.log(500,error)
		} else {
			// console.log(201)
			response.json(result)
		}
	})
}

tasks.update = function(request, response) {
	var id    = request.params.id
	var query = request.body.query
	var patch = request.body.patch
	Task.findOne(query,function(error,found_task) {
		if (error) {
			response.json(error)
		} else {
			for (key in patch) {
				found_task[key] = patch[key]
			}
			found_task.save(function(error,saved_task) {
				response.json(saved_task)
			})
		}
	})
}

tasks.delete = function(request, response) {
	var id = request.params.id
	Task.remove({'_id':id},function(error,result) {
		if (error) {
			// console.log(500,error)
		} else {
			// console.log(201.9)
			response.json(result)
		}
	})
}

module.exports = tasks
