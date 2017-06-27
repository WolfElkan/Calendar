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

		// $('#calendar-scroll').it(function(element) {
		// 	element.scrollTop = 530 // 8:50 AM to 5:10 PM
		// })

		$('#new-event').it(function(element) {
			element.style.display = 'none'
		})

		// $('.day').index(0,function(element,i) {
			// console.log(element)
		// })

		// $('.plus').every(function(element,i) {

		// })

		$('.day').every(function(element,off_by_one) {
			// element.innerHTML = 'Goodbye' + i
			var i = off_by_one - 1
			// console.log($scope.days[i])
			if (off_by_one) {
				$scope.days[i].print(element)
			}
			// element.innerHTML = i + '&#x1f984;'
		})

	// Events

		EventFactory.get(function(events) {
			var offset = {px:0}
			var html = ''
			// for (var i = 0; i < events.length; i++) {
			// 	html += events[i].div(start,offset)
			// }
			for (var i = 0; i < $scope.hours.length; i++) {
				$scope.hours[i]
			}
			$('.day').index(0,function(day) {
				day.innerHTML = html
			})
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
			// return `<div class="plus" style="top: ${top}px; height: ${height}px" ng-click="new(${Number(this.time)})">+</div>\n`
		}
	}

	function Day(initial,plus_days) {
		var midnight = $date.move($date.midnight(initial),0,0,plus_days)
		this.head = midnight
		this.hours = []
		for (var h = 0; h < $scope.hours.length; h++) {
			this.hours.push(new Hour($date.combine(midnight,$scope.hours[h])))
		}
		this.events = []
		this.add_event = function() {} // Sort events by start time
		this.print = function(element) {
			var divs = []
			var e = 0, h = 0
			// // If one of them is depleted, do the other one
			// while (e < this.events.length || h < this.hours.length) {
			// 	if (this.events[e].start <= this.hours[h]) {
			// 		divs.push(this.events[e++])
			// 	} else {
			// 		divs.push(this.hours[h++])
			// 	}
			// }
			var html = ''
			var offset = {'px':0}
			for (var i = 0; i < this.hours.length; i++) {
				html += this.hours[i].div(midnight,offset)
			}
			// console.log(html)
			// var html = this.head + '<br>&#x1f984;'
			element.innerHTML = html
		}
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

		// EventFactory.print()


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