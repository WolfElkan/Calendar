app.service('$date',function() {

	var service = {}

	service.combine = function(date,time) {
		return new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			time.getHours(),
			time.getMinutes(),
			time.getSeconds(),
			time.getMilliseconds()
		)
	}

	return service
	
})
