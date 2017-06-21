app.factory('EventFactory',['$http','$find','$valid',function($http,$find,$valid) {

	var factory = {}
	var content = []
	var loaded_dates = []

	factory.get = function(callback) {
		if (typeof(callback) == 'function') {
			if (content[0]) {
				return callback(content)
			} else {
				$http.get('/events').then(function(returned) {
					content = returned.data.events
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

	factory.create = function(new_event) {
		var obj = $valid.ate(factory,new_event)
		console.log(obj)
		if (obj.valid) {
			var promise = $http.post('/events',new_event)
			promise.then(function(returned) {
				if (returned.status == 200) {
					content.push(returned.data)
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
