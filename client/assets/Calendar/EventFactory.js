app.factory('EventFactory',['$http','$find','$valid','$date',function($http,$find,$valid,$date) {

	var factory = {}
	var content = []
	var loaded_dates = []

	function Event(data) {
		this.title = data.title
		this.color = data.color
		this.start = $date.parse(data.start)
		this.end   = $date.parse(data.end)
		// this.created_at = $date.parse(data.created_at)
		// this.updated_at = $date.parse(data.updated_at)
		// this.Graphic = function(date,offset,scale=1) {
		// 	scale /= 60000
		// 	date = $date.midnight(date)
		// 	var top = (Number(this.start) - Number(date)) * scale - offset.px
		// 	var height = (this.end - this.start) * scale
		// }
	}

	function LoadedDate(sld) {
		this.date   = new Date(sld.date)
		this.events = sld.events
	}

	function LookupDate(di,date) {
		this.di   = di
		this.date = Number(date)
	}

	factory.get = function(callback) {
		if (typeof(callback) == 'function') {
			if (content[0]) {
				return callback(content)
			} else {
				$http.get('/events').then(function(returned) {
					for (var i = 0; i < returned.data.events.length; i++) {
						content.push(new Event(returned.data.events[i]))
					}
					return callback(content)
				})
			}
		} else if (!callback) {
			if (!content[0]) {
				var promise = $http.get('/events')
				promise.then(function(returned) {
					content = returned.data.events
				})
				return promise
			}
		} else {
			throw new TypeError('Expected Function, got',callback.__proto__.constructor.name)
		}
	}

	factory.get_by_dates = function(dates,callback) {
		var fx_loaded_dates = []
		var lookup = []
		for (var d = 0; d < dates.length; d++) {
			var date = dates[d]
			// date = $date.midnight(date)
			var date_index = $find.index(loaded_dates,Number(date),function(ld) {
				return Number(ld.date)
			})
			// console.log(date_index)
			if (date_index + 1) {
				fx_loaded_dates[d] = (loaded_dates[date_index])
			} else {
				lookup.push(new LookupDate(d,date))
			}
		}
		if (lookup[0]) {
			$http.get('/events',{params:{dates:lookup}}).then(function(returned) {
				var slds = returned.data.days
				for (var i = 0; i < slds.length; i++) {
					var sld = slds[i]
					var new_loaded_date = new LoadedDate(sld)
					loaded_dates.push(new_loaded_date)
					fx_loaded_dates[sld.di] = new_loaded_date
				}
				for (var i = 0; i < fx_loaded_dates.length; i++) {
					callback(fx_loaded_dates[i],i)
				}
			})
		} else {
			for (var i = 0; i < fx_loaded_dates.length; i++) {
				callback(fx_loaded_dates[i],i)
			}
		}

	}

	factory.validations = []

	factory.test = function() {
		$http.get('/events/test',{params:{date:1498449600000-86400000}}).then(function(returned) {
			console.log(returned.data)
		})
	}

	factory.create = function(new_event,callback) {
		var obj = $valid.ate(factory,new_event)
		// console.log(obj)
		if (obj.valid) {
			var promise = $http.post('/events',new_event)
			promise.then(function(returned) {
				if (returned.status == 200) {
					var created_event = new Event(returned.data)
					content.push(created_event)
					if (callback) {
						callback(created_event)
					}
				} else {
					console.log(returned)
				}
			})
			return promise
		}
	}

	factory.update = function(id,patch) {
		if ($valid.ate(patch).valid) {
			var promise = $http.put('/events/'+id,{'query':{'_id':id},'patch':patch})
			promise.then(function(returned) {
				if (returned.status == 200) {
					var index = $find.index(content,id)
					content[index] = returned.data
				} else {
					console.log(returned)
				}
			})
			return promise
		}
	}

	factory.delete = function(id) {
		if ($find.index(content,id)+1) {
			var promise = $http.delete('/events/'+id)
			promise.then(function(returned) {
				if (returned.status == 200) {
					var index = $find.index(content,id)
					for (var i = index; i < content.length; i++) {
						content[i] = content[i+1]
					}
					content.pop()
				} else {
					// console.log(returned)
				}
			})
			return promise
		}
	}

	factory.print = function() {
		console.log(loaded_dates)
		// if (content.length) {
		// 	console.log(content)
		// } else {
		// 	console.log('getting content...')
		// 	factory.get(function(content) {
		// 		console.log(content)
		// 	})
		// }
	}

	factory.echo = function() {
		$http.get('/echo').then(function(returned) {
			console.log(returned.data)
		})
	}

	return factory

}])
