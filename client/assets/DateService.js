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

	service.parse = function(str) {
		var year  = str.substr( 0,4)
		var month = str.substr( 5,2) - 1
		var date  = str.substr( 8,2)
		var hour  = str.substr(11,2)
		var min   = str.substr(14,2)
		var sec   = str.substr(17,str.length-18)
		return new Date(year,month,date,hour,min,sec)
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