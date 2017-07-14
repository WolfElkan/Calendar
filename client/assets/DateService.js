// All methods in this service return JavaScript Date objects.
app.service('$date',function() {

	var service = {}

	service.combine = function(date,time) {
		date = new Date(date)
		time = new Date(time)
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

	service.parse = function(input,tz) {
		tz = tz ? tz : new Date().getTimezoneOffset()
		var type = input.__proto__.constructor
		if (type == Date) {
			return input
		} else if (type == Number) {
			return new Date(input)
		} else if (type == String) {
			if (/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d{0,3})?/.exec(input)) {
				var year  = input.substr( 0,4)
				var month = input.substr( 5,2) - 1
				var date  = input.substr( 8,2)
				var hour  = input.substr(11,2)
				var min   = input.substr(14,2) - tz
				var sec   = input.substr(17,input.length-18)
				return new Date(year,month,date,hour,min,sec)
			} else if (/^\d+$/.exec(input)) {
				return new Date(Number(input))
			}
		}
	}

	service.midnight = function(date) {
		date = new Date(date)
		return new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			0,0,0
		)
	}

	service.move = function(date,dYears=0,dMonths=0,dDays=0,dHours=0,dMinutes=0,dSeconds=0) {
		return new Date(
			date.getFullYear() + dYears,
			date.getMonth()    + dMonths,
			date.getDate()     + dDays,
			date.getHours()    + dHours,
			date.getMinutes()  + dMinutes,
			date.getSeconds()  + dSeconds
		)
	}

	return service
	
})