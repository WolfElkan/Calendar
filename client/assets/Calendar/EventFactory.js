app.factory('EventFactory',['$http','$find','$valid','$date',function($http,$find,$valid,$date) {

	var factory = {}
	var content = []

	factory.validations = []

	function Event(data) {
		this.title = data.title
		this.color = data.color
		this.start = $date.parse(data.start)
		this.end   = $date.parse(data.end)
		this._id   = data._id
		// this.created_at = $date.parse(data.created_at)
		// this.updated_at = $date.parse(data.updated_at)
	}

	function LoadedDate(data) {
		this.date   = $date.parse(data.date)
		this.events = data.events
		this.asof   = new Date
	}

	factory.get_by_date = function(date,callback) {
		var ldi = $find.index(content,date,'date')
		if (ldi + 1) {
			callback(content[ldi].events)
		} else {
			$http.get('/events',{params:{date:Number(date)}}).then(function(returned) {
				var new_loaded_date = new LoadedDate(returned.data)
				content.push(new_loaded_date)
				callback(new_loaded_date.events)
				// for (var i = 0; i < returned.data.length; i++) {
				// 	events.push(new Event(returned.data[i]))
				// }
				// callback(events)
			})
		}
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
		if (content.length) {
			console.log(content)
		} else {
			console.log('getting content...')
			factory.get(function(content) {
				console.log(content)
			})
		}
	}

	return factory

}])
