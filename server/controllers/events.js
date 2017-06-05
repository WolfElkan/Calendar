
var Event = require('../models/event.js')

var events = {}

events.index  = function(request, response) {
	Event.find({},function(error,result) {
		response.json({'events':result})
	})
}

events.show = function(request, response) {
	var id = request.params.id
	Event.find({'_id':id},function(error,result) {
		response.json(result)
	})
}

events.create = function(request,response) {
	new_event = new Event({
		field   : request.body.field,
		temp_id : request.body.temp_id,
	})
	new_event.save(function(error,result) {
		if (error) {
			// console.log(500,error)
		} else {
			// console.log(201)
			response.json(result)
		}
	})
}

events.update = function(request, response) {
	var id    = request.params.id
	var query = request.body.query
	var patch = request.body.patch
	Event.findOne(query,function(error,found_event) {
		if (error) {
			response.json(error)
		} else {
			for (key in patch) {
				found_event[key] = patch[key]
			}
			found_event.save(function(error,saved_event) {
				response.json(saved_event)
			})
		}
	})
}

events.delete = function(request, response) {
	var id = request.params.id
	Event.remove({'_id':id},function(error,result) {
		if (error) {
			// console.log(500,error)
		} else {
			// console.log(201.9)
			response.json(result)
		}
	})
}

module.exports = events
