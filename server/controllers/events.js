var Event = require('../models/event.js')

var events = {}

events.index  = function(request, response) {
	console.log('index')
	Event.find({}).sort('start').exec(function(error,found_events) {
		response.json({'events':found_events})
	})
}

function LookupDateBatch(lookups,response) {
	var self = this
	var children = []
	for (var i = 0; i < lookups.length; i++) {
		children.push(new LookupDate(lookups[i],self))
	}
	self.go = function() {
		// console.log('# batch: go')
		for (var i = 0; i < children.length; i++) {
			children[i].query()
		}
	}
	self.check = function() {
		// console.log('# batch: check')
		for (var i = 0; i < children.length; i++) {
			if (!children[i].ready) {
				return false
			}
		}
		var data = {days:[]}
		for (var i = 0; i < children.length; i++) {
			data.days.push({
				di     :children[i].di,
				events :children[i].events,
				date   :children[i].date,
			})
		}
		response.json(data)
	}
}

events.test = function(request, response) {
	var start = Number(request.query.date)
	// date = new Date(date)
	var end = start + 86400000
	// console.log(date)
	// console.log(date.__proto__.constructor.name)
	Event.find(between(start,end),function(error,found_events) {
		response.json({events:found_events})
	})
}

function between(start,end) {
	// return {$and:[
	// 	{start:{$gt : new Date(2017,5,24)}},
	// 	{start:{$lte: new Date(2017,5,25)}},
	// ]}
	// return {}
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

function LookupDate(lookup,batch) {
	lookup = JSON.parse(lookup)
	var self = this
	self.date  = lookup.date
	self.ready = false
	self.di    = lookup.di
	var qstart = new Date(lookup.date)
	var qend   = new Date(lookup.date + (lookup.len ? lookup.len : 86400000))
	// console.log(lookup)
	self.events = []
	self.query = function() {
		console.log('query')
		Event.find(between(qstart,qend)).sort('start').exec(function(error,found_events) {
			// console.log(error,found_events)
			for (var i = 0; i < found_events.length; i++) {
				self.events.push(found_events[i])
			}
			self.ready = true
			batch.check()
		})
	}
}

events.by_date = function(request, response) {
	var lookup_date_batch = new LookupDateBatch(request.query.dates,response)
	lookup_date_batch.go()
}

// events.by_date = function(request, response) {
// 	// console.log(request.query)
// 	var dates = request.query.dates
// 	var data = []
// 	for (var i = 0; i < dates.length; i++) {
// 		var lookup_date = JSON.parse(dates[i])
// 		// console.log(lookup_date.__proto__.constructor.name)
// 		var qstart = new Date(lookup_date.date)
// 		var qend   = new Date(lookup_date.date + (lookup_date.len ? lookup_date.len : 86400000))
// 		Event.find({$or:[
// 			{'start': {$gte: qstart, $lt : qend} },
// 			{'end'  : {$gt : qstart, $lte: qend} },
// 			{$and: [
// 				{'start': {$lte: qstart} },
// 				{'end'  : {$gte: qend  } },
// 			]}
// 		]}).sort('start').exec(function(error,found_events) {})
// 	}
// 	response.json({'lookups':data})
// }

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
