app.service('$valid',function() {

	var service = {}

	function Validation(field,error) {
		this.check = function(form,obj) {
			if (!this.valid(form)) {
				obj.errors.push({'field':field,'error':error})
				obj.valid = false
			}
			return obj
		}
	}

	// Checks whether data has been entered in specified field
	service.Present = function(field,error) {
		error = error ? error : 'Please enter a ' + field
		var self = new Validation(field,error)
		self.valid = function(form) {
			return Boolean(form[field])
		}
		return self
	}

	// Checks whether form data in specified field matches a given regular expression
	service.Regular = function(field,regex,error) {
		var self = new Validation(field,error)
		self.valid = function(form) {
			var data = form[field] ? form[field] : ''
			return Boolean(regex.exec(data))
		}
		return self
	}

	// Checks whether form data in two specified fields are the same
	// If not, saves error to the main_field
	service.Confirm = function(main_field,conf_field,error) {
		var self = new Validation(main_field,error)
		self.valid = function(form) {
			var main = form[main_field] ? form[main_field] : ''
			var conf = form[conf_field] ? form[conf_field] : ''
			return main == conf
		}
		return self
	}

	// Private method called by the Blacklist and Whitelist methods
	function List(field,array,error,color) {
		var self = new Validation(field,error)
		self.valid = function(form) {
			var result = !color
			for (var i = 0; i < array.length; i++) {
				if (form[field] == array[i]) {
					result = color
					break
				}
			}
			return result
		}
		return self
	}

	// Checks to make sure that form data is NOT a member of a given array
	service.Blacklist = function(field,black,error) {
		return new List(field,black,error,false)
	}

	// Checks to make sure that form data IS a member of a given array
	service.Whitelist = function(field,white,error) {
		return new List(field,white,error,true)
	}

	// Uses a callback to check data. Note that the error parameter is 2nd, not 3rd.
	service.Custom = function(field,error,callback) {
		var self = new Validation(field,error)
		self.valid = function(form) {
			return Boolean(callback(form))
		}
		return self
	}

	service.Compare = function(field,limit,error,lt,eq,gt) {
		var self = new Validation(field,error)
		self.valid = function(form) {
			var data = Number(form[field])
			limit = Number(limit)
			if (data == limit) {
				return Boolean(eq)
			} else if (data < limit) {
				return Boolean(lt)
			} else if (data > limit) {
				return Boolean(gt)
			} else {
				return true
			}
		}
		return self
	}

	// Checks all given validations.  Returns error object
	service.ate = function(factory,form) {
		var validations
		var obj = {valid:true,errors:[]}
		if (factory && typeof(factory) == 'array') {
			validations = factory
		} else if (!factory || !factory.validations || !factory.validations[0]) {
			return obj
		} else {
			validations = factory.validations
		}
		for (var i = 0; i < validations.length; i++) {
			obj = validations[i].check(form,obj)
		}
		return obj
	}

	// Displays errors from error object in scope
	service.blame = function($scope,obj,form='errors',sep=' ') {
		$scope[form] = {}
		var errors = obj.errors
		for (var i = 0; i < errors.length; i++) {
			var error = errors[i]
			var field = error.field
			$scope[form][field] = $scope[form][field] ? $scope[form][field] : ''
			$scope[form][field] += sep + error.error
		}
	}

	return service

})
// // Template for new Validation types
// service.New = function(field,error,other_args) {
// 	var self = new Validation(field,error)
// 	self.valid = function(form) {
// 		// body...
// 	}
// 	return self
// }
