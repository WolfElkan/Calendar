app.factory('EventFactory',['$http','$find','$valid','$date',function($http,$find,$valid,$date) {

	var factory = {}
	var content = []
	var loaded_dates = []

	function Event(data) {
		console.log('new Event')
		this.title = data.title
		this.color = data.color
		this.start = $date.parse(data.start)
		this.end   = $date.parse(data.end)
		// this.created_at = $date.parse(data.created_at)
		// this.updated_at = $date.parse(data.updated_at)
		this.Graphic = function(date,offset,scale=1) {
			scale /= 60000
			date = $date.midnight(date)
			var top = (Number(this.start) - Number(date)) * scale - offset.px
			var height = (this.end - this.start) * scale
		}
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

	factory.validations = []

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
