app.controller('Calendar',['$','$scope','$routeParams','$location','$compile','$date','EventFactory',
function                  ( $ , $scope , $routeParams , $location , $compile , $date , EventFactory) {

// On Load

	// Navigation

		if (!$routeParams.year) {
			var now = new Date()
			now -= now.getDay() * 86400000
			now = new Date(now)
			go(now)
		}

		var start = new Date($routeParams.year,$routeParams.month,$routeParams.date)

		if (Number(start) && (
			$routeParams.date  != start.getDate()  ||
			$routeParams.month != start.getMonth() ||
			$routeParams.year  != start.getFullYear() ) ) {
			go(start)
		}

	// Content

		$scope.hours = []
		for (var h = 0; h < 24; h++) {
			$scope.hours.push($date.move(start,0,0,0,h))
		}

		$scope.days = []
		for (var d = 0; d < 7; d++) {
			$scope.days.push(new Day(start,d))
		}

		console.log($scope.days)

		$scope.new_event = {
			'title' : '',
			'color' : '#facade',
		}

		$('#calendar-scroll').it(function(element) {
			element.scrollTop = 530 // 8:50 AM to 5:10 PM
		})

		$('#new-event').it(function(element) {
			element.style.display = 'none'
		})

	// Events

		EventFactory.get(function(events) {
			
		})

// Constructors

	function Hour(time) {
		this.time = time
		this.div = function(date,offset,scale=1) {
			var height = 60 * scale
			scale /= 60000
			date = $date.midnight(date)
			var top = (Number(this.time) - Number(date)) * scale - offset.px
			// console.log()
			offset.px += height
			return '<div plus time="12345">Hello</div>'
			// return `<div plus top="${top}" height="${height}" time="${Number(this.time)}"></div>`
		}
	}

	function HourGraphic(date,hour,offset,scale=1) {
		this.height = 60 * scale
		scale /= 60000
		date = $date.midnight(date)
		this.top = (Number(hour) - Number(date)) * scale - offset.px
		offset.px += this.height
		this.class = "plus"
		this.title = "+"
		this.color = null
	}

	function EventGraphic(event,offset,scale=1) {
		this.class  = "event"
		this.title  = event.title
		this.height = (event.end - event.start) * scale
		this.top    = (Number(event.start) - Number(date)) * scale - offset.px
		this.color  = event.color
	}

	function Day(initial,plus_days,events=[]) {
		var midnight = $date.move($date.midnight(initial),0,0,plus_days)
		var hours = []
		for (var h = 0; h < $scope.hours.length; h++) {
			hours.push(new Hour($date.combine(midnight,$scope.hours[h])))
		}
		var content = []
		var h = 0, e = 0
		var offset = {'px':0}
		while (h < hours.length || e < events.length) {
			if (hours[h] ? hours[h].time : Infinity < events[e] ? events[e].start : Infinity) {
				content.push(new HourGraphic(midnight,hours[h],offset))
			} else {
				content.push(new EventGraphic(events[e],offset))
			}
		}
		this.head = midnight
		this.content = function(day_element) {
			setTimeout(function() {
				var apply_styles = function(element,i) {
					element.style.top = content[i].top
					element.style.height = content[i].height
				}
				$('.plus',day_element).every(apply_styles)
				$('.event',day_element).every(apply_styles)
			}, 0);
			return content
		}
		this.add_event = function(event) {
			var place = binary_search(event,content)
			for (var i = content.length - 1; i > place; i--) {
				content[i] = content[i-1]
			}
		}
		// this.html = function() {
		// 	var result = []
		// 	var offset = {'px':0}
		// 	for (var i = 0; i < content.length; i++) {
		// 		var type = content[i].__proto__.constructor.name
		// 		if (type == "Hour") {
		// 			result.push(new HourGraphic(midnight,content[i],offset))
		// 		} else if (type == "Event") {}

		// 	}
		// 	return result
		// }
	}

// Support Functions

	function go(date) {
		date = new Date(date)
		var url = 'calendar?view=week'
		url += '&year=' + date.getFullYear()
		url += '&month='+ date.getMonth()
		url += '&date=' + date.getDate()
		$location.url(url)
	}

	function display(day,events) {
		var str = ''
		var off = 0
		for (var i = 0; i < events.length; i++) {
			var event = new EventGraphic(events[i],off)
			str += event.str
			off = event.off
		}
		var html = str
		html += day.innerHTML
		day.innerHTML = html
		// console.log(off/60)
		day.$('.plus').bottom(off)
	}

// Scope Functions

	$scope.new = function(hour) {
		hour = hour.time
		$scope.new_event.dateE = new Date(Number(hour) + 3600000)
		$scope.new_event.timeE = new Date(Number(hour) + 3600000)
		$scope.new_event.dateS = hour
		$scope.new_event.timeS = hour
		$('#new-event').it(function(element) {
			element.style.display = 'inline-block'
		})
	}

	$scope.create = function() {
		$scope.new_event.start = $date.combine($scope.new_event.dateS,$scope.new_event.timeS)
		$scope.new_event.end   = $date.combine($scope.new_event.dateE,$scope.new_event.timeE)
		$scope.new_event.dateS = undefined
		$scope.new_event.timeS = undefined
		$scope.new_event.dateE = undefined
		$scope.new_event.timeE = undefined
		// console.log($scope.new_event)
		EventFactory.create($scope.new_event,function(created_event) {
			console.log(created_event)
		})
		$('#new-event').it(function(element) {
			element.style.display = 'none'
		})
		$scope.new_event = {
			'title' : '',
			'color' : '#ffffff',
		}
	}

	$scope.cancel = function() {
		$('#new-event').it(function(element) {
			element.style.display = 'none'
		})
	}

	$scope.cross = function(option) {
		if ($scope.days[0].head.getMonth() == $scope.days[6].head.getMonth()) {
			return option == 0
		} else if ($scope.days[0].head.getYear() == $scope.days[6].head.getYear()) {
			return option == 1
		} else {
			return option == 2
		}
	}

	$scope.isToday = function(day) {
		return Number($date.midnight(day.head)) == Number($date.midnight(new Date()))
	}

	$scope.delete = function(id) {
		EventFactory.delete(id)
	}

	$scope.nav = function(dDays) {
		go($date.move(start,0,0,dDays))
	}

	$scope.print = function() {
		// console.log('load')
		// var x = $('.day')
		// console.log(x)

		EventFactory.print()


	}

// Development Functions

	function print(obj) {
		for (key in obj) {
			console.log(key,':',obj)
		}
	}

	$scope.range = function(lo,hi,inc=1) {
		var result = []
		for (var i = lo; i <= hi; i+=inc) {
			result.push(i)
		}
		return result
	}

}])