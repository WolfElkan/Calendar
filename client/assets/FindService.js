app.service('$find',function() {

	var service = {}

	service.equal = function(val1,val2) {
		console.log(val1,val2)
		val1 = val1 && val1.__proto__.constructor.name == "Date" ? Number(val1) : val1
		val2 = val2 && val2.__proto__.constructor.name == "Date" ? Number(val2) : val2
		return val1 == val2
	}

	service.index = function(content,id,key='_id') {
		for (var i = 0; i < content.length; i++) {
			if (service.equal(content[i][key],id)) {
				return i
			}
		}
	}

	// service.index = function(content,val,key='_id') {
	// 	console.log(content)
	// 	// console.log(arguments)
	// 	// var key_is_fx = key.__proto__.constructor.name == "Function"
	// 	for (var i = 0; i < content.length; i++) {
	// 		console.log(content[i][key],val)
	// 		var val_i = key_is_fx ? key(content[i]) : content[i][key]
	// 		if (val_i == val) {
	// 			return i
	// 		}
	// 	}
	// }

	service.element = function(content,val,key='_id') {
		var index = service.index(content,val,key)
		return content[index]
	}

	service.clone = function(content,val,key='_id') {
		var element = service.element(content,val,key)
		var result = {}
		for (k in element) {
			result[k] = element[k]
		}
		return result
	}

	service.isolate = function(object,path) {
		var result = object
		for (var i = 0; i < path.length; i++) {
			result = result[path[i]]
		}
		return result
	}

	service.binary = function(content,value,path=[]) {
		// if (!service.isSorted(content,path)) {
		// 	console.log('Content not Sorted:', content)
		// 	return null
		// }

	}

	service.isSorted = function(content,path=[]) {}

	return service
	
})
