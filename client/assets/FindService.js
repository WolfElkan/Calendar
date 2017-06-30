app.service('$find',function() {

	var service = {}

	service.index = function(content,id,key='_id') {
		for (var i = 0; i < content.length; i++) {
			if (content[i][key] == id) {
				return i
			}
		}
	}

	service.element = function(content,id,key='_id') {
		var index = service.index(content,id,key)
		return content[index]
	}

	service.clone = function(content,id,key='_id') {
		var element = service.element(content,id,key)
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
