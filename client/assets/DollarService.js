// A jQuery approximation built from scratch
app.service('$',function() {

	function Iterator(elements) {
		this.every = function(callback) {
			setTimeout(function() {
				for (var i = 0; i < elements.length; i++) {
					callback(elements[i],i)
				}
			}, 0);
		}
		this.index = function(i,callback) {
			setTimeout(function() {
				callback(elements[i])
			}, 0);
		}
		this.it = function(callback) {
			callback(elements)
		}
	}

	var service = function(selector,parent=document) {
		var got
		if (selector[0] == '#') {
			got = parent.getElementById(selector.substr(1))
		} 
		else if (selector[0] == '.') {
			got = parent.getElementsByClassName(selector.substr(1))
		} 
		else if (selector[0] == '<') {
			if (selector.substr(-1) == '>') {
				selector = selector.substr(0, selector.length - 1)
			}
			got = parent.getElementsByTagName(selector.substr(1))
		} 
		else {
			got = parent.getElementsByName(selector.substr(1))
		}
		return new Iterator(got)
	}

	return service
	
})