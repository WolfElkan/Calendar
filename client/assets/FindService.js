app.service('$find',function() {

	var service = {}

	service.equal = function(val1,val2) {
		if (val1.__proto__.constructor.name == "Date" ||
			val2.__proto__.constructor.name == "Date") {
			val1 = Number(val1)
			val2 = Number(val2)
		}
		return val1 == val2
	}

	service.index = function(content,value,key='_id') {
		for (var i = 0; i < content.length; i++) {
			if (service.equal(content[i][key],value)) {
				return i
			}
		}
	}

	service.element = function(content,value,key='_id') {
		var index = service.index(content,value,key)
		return content[index]
	}

	service.clone = function(content,value,key='_id') {
		var element = service.element(content,value,key)
		var result = {}
		for (k in element) {
			result[k] = element[k]
		}
		return result
	}

	service.isolate = function(object,path) {
		var result = object
		for (var i = 0; i < path.length; i++) {
			if (path[i].__proto__.constructor.name == "Function") {
				var fx = path[i]
				result = fx(result)
			} else {
				result = result[path[i]]
			}
		}
		return result
	}

	service.binary = function(content,value,path=[]) {
		var lo = 0
		var hi = content.length
		while (hi-lo > 1) {
			var mid = lo + (hi-lo) / 2
			var index = Math.round(mid)
			var guess = content[index]
			guess = service.isolate(guess,path)
			if (guess == value) {
				return index
			} else if (guess < value) {
				hi = mid
			} else if (guess > value) {
				lo = mid
			}
		}
		return Math.floor(mid) + 0.5
	}

	return service
	
})
