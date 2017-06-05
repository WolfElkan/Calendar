app.factory('BlockFactory',['$http','$find','$valid',function($http,$find,$valid) {

	var factory = {}
	var content = []

	factory.get = function(callback) {
		if (typeof(callback) == 'function') {
			if (content[0]) {
				return callback(content)
			} else {
				$http.get('/blocks').then(function(returned) {
					content = returned.data.blocks
					return callback(content)
				})
			}
		} else if (!callback) {
			if (!content[0]) {
				var promise = $http.get('/blocks')
				promise.then(function(returned) {
					content = returned.data.blocks
				})
				return promise
			}
		} else {
			throw new TypeError('Expected Function, got',callback.__proto__.constructor.name)
		}
	}

	factory.validations = []

	factory.create = function(new_block) {
		if ($valid.ate(factory,new_block).valid) {
			var promise = $http.post('/blocks',new_block)
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
			var promise = $http.put('/blocks/'+id,{'query':{'_id':id},'patch':patch})
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
			var promise = $http.delete('/blocks/'+id)
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
