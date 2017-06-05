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

	return service
	
})
