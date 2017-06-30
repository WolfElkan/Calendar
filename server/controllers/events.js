var Event = require('../models/event.js')

var events = {}

events.index  = function(request, response) {
	console.log('index')
	Event.find({}).sort('start').exec(function(error,found_events) {
		response.json({'events':found_events})
	})
}

function LookupDateBatch(lookups) {
	var children = []
	for (var i = 0; i < lookups.length; i++) {
		children.push(new LookupDate(lookups[i],this))
	}
}

function LookupDate(lookup,batch) {

}

events.by_date = function(request, response) {
	// console.log(request.query)
	var dates = request.query.dates
	var data = []
	for (var i = 0; i < dates.length; i++) {
		var lookup_date = JSON.parse(dates[i])
		// console.log(lookup_date.__proto__.constructor.name)
		var qstart = new Date(lookup_date.date)
		var qend   = new Date(lookup_date.date + (lookup_date.len ? lookup_date.len : 86400000))
		// console.log(qstart,qend)
		Event.find({$or:[
			{'start': {$gte: qstart, $lt : qend} },
			{'end'  : {$gt : qstart, $lte: qend} },
			{$and: [
				{'start': {$lte: qstart} },
				{'end'  : {$gte: qend  } },
			]}
		]}).sort('start').exec(function(error,found_events) {})
	}
	response.json({'lookups':data})
}

events.show = function(request, response) {
	var id = request.params.id
	Event.findOne({'_id':id},function(error,found_event) {
		response.json(found_event)
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
	new_event.save(function(error,created_event) {
		if (error) {
			// console.log(500,error)
		} else {
			// console.log(201)
			response.json(created_event)
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
