var Event = require('../models/event.js')

var events = {}

events.index  = function(request, response) {
	Event.find({}).sort('start').exec(function(error,result) {
		response.json({'events':result})
	})
}

events.show = function(request, response) {
	var id = request.params.id
	Event.find({'_id':id},function(error,result) {
		response.json(result)
	})
}

function between(start,end) {
	start = new Date(start)
	end   = new Date(end)
	return {$or:[
		{start: {$gte: start, $lt : end} },
		{end  : {$gt : start, $lte: end} },
		{$and: [
			{start: {$lte: start} },
			{end  : {$gte: end  } },
		]}
	]}
}

events.by_date = function(request,response) {
	var start = Number(request.query.date)
	var end   = start + 86400000
	var range = between(new Date(start),new Date(end))
	// console.log(range)
	Event.find(range,function(error,found_events) {
		if (error) {
			console.log(error.stringValue,request.query)
		} else {
			response.json({
				date   : request.query.date,
				events : found_events
			})
		}
	})
}

events.create = function(request,response) {
	console.log('create event')
	new_event = new Event({
		title : request.body.title,
		color : request.body.color,
		start : request.body.start,
		end   : request.body.end
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
