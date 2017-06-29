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

		$scope.days = []
		
		for (var d = 0; d < 7; d++) {
			var date = $date.move($date.midnight(start),0,0,d)
			EventFactory.get_by_date(date,function(events) {
				$scope.days.push(new Day(date,d,events))
			})
			if (d == 6) {
				$scope.cross = function(option) {
					if ($scope.days[0].head.getMonth() == $scope.days[6].head.getMonth()) {
						return option == 0
					} else if ($scope.days[0].head.getYear() == $scope.days[6].head.getYear()) {
						return option == 1
					} else {
						return option == 2
					}
				}
			}
		}

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

	function PlusBox(date,hour,offset,scale=1) {
		this.height = 60 * scale
		scale /= 60000
		date = $date.midnight(date)
		this.top = (Number(hour.time) - Number(date)) * scale - offset.px
		offset.px += this.height
		this.class = "plus"
		this.title = "+"
		this.color = null
	}

	function EventGraphic(event,offset,scale=1) {
		scale /= 60000
		this.class  = "event"
		this.title  = event.title
		this.height = (event.end - event.start) * scale
		this.top    = (Number(event.start) - Number(date)) * scale - offset.px
		this.color  = event.color
		offset.px += this.height
	}

	function Day(initial,index,events) {
		var midnight = $date.midnight(initial)
		var hours = []
		for (var h = 0; h < $scope.hours.length; h++) {
			hours.push(new Hour($date.combine(midnight,$scope.hours[h])))
		}
		var content = []
		var h = 0, e = 0
		var offset = {'px':0}
		while (h < hours.length || e < events.length) {
			var l = content.length
			if ((hours[h] ? hours[h].time : Infinity) < (events[e] ? events[e].start : Infinity)) {
				content.push(new PlusBox(midnight,hours[h],offset))
				hours[h] = content[l]
				h++
			} else {
				content.push(new EventGraphic(events[e],offset))
				events[e] = content[l]
				e++
			}
		}
		// console.log(offset.px)
		this.head = midnight
		this.content = function() {
			$('.day').index(index+1,function(day_element) {
				setTimeout(function() {
					$('.plus',day_element).every(function(element,h) {
						element.style.top    = hours[h].top     + 'px'
						element.style.height = hours[h].height  + 'px'
					})
					$('.event',day_element).every(function(element,e) {
						element.style.top    = events[e].top    + 'px'
						element.style.height = events[e].height + 'px'
						element.style.backgroundColor = events[e].color
					})
				}, 0);
			})
			return content
		}
		this.add_event = function(event) {
			var place = binary_search(event,content)
			for (var i = content.length - 1; i > place; i--) {
				content[i] = content[i-1]
			}
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