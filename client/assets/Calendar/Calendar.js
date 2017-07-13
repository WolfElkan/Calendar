app.controller('Calendar',['$','$scope','$routeParams','$location','$compile','$date','EventFactory',
function                  ( $ , $scope , $routeParams , $location , $compile , $date , EventFactory) {

// On Load

	// Navigation

		if (!$routeParams.year) {
			var now = new Date()
			now -= now.getDay() * 86400000
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

		// console.log(start)

		var nDays = 7
		$scope.nDays = nDays
		$scope.days = [
			new BlankDay,
			new BlankDay,
			new BlankDay,
			new BlankDay,
			new BlankDay,
			new BlankDay,
			new BlankDay
		]
		
		for (var d = 0; d < nDays; d++) {
			new Day(start,d,(d == nDays-1),function() {
				console.log($scope.days)
			})
		}
			// var date = $date.move($date.midnight(start),0,0,d)
			// EventFactory.get_by_date(date,d,function(events,index) {
			// 	console.log(index,date,events)
			// 	$scope.days.push(new Day(date,index,events))
			// 	if (d == nDays-1) {
			// 		console.log($scope.days)
			// 		$scope.cross = function(option) {
			// 			if ($scope.days[0].head.getMonth() == $scope.days[nDays-1].head.getMonth()) {
			// 				return option == 0
			// 			} else if ($scope.days[0].head.getYear() == $scope.days[nDays-1].head.getYear()) {
			// 				return option == 1
			// 			} else {
			// 				return option == 2
			// 			}
			// 		}
			// 	}
			// })

// Constructors

	function Offset(px) {
		this.px = px
	}

	function Hour(time) {
		this.time = time
		var plus_id = "plus"
		plus_id += time.getDay()
		plus_id += time.getHours() < 10 ? '0' : ''
		plus_id += time.getHours()
		this.plus_id = plus_id

		// this.div = function(date,offset,scale=1) {
		// 	var height = 60 * scale
		// 	scale /= 60000
		// 	date = $date.midnight(date)
		// 	var top = (Number(this.time) - Number(date)) * scale - offset.px
		// 	// console.log()
		// 	offset.px += height
		// 	return '<div plus time="12345">Hello</div>'
		// 	// return `<div plus top="${top}" height="${height}" time="${Number(this.time)}"></div>`
		// }
	}

	function PlusBox(date,hour,offset,scale=1) {
		// console.log(arguments)
		this.height = 60 * scale
		scale /= 60000
		date = $date.midnight(date)
		this.top = (Number(hour.time) - Number(date)) * scale - offset.px
		offset.px += this.height
		this.class = "plus"
		this.title = "+"
		this.color = null
		// console.log(date)
		this.id    = hour.plus_id
		this.hour  = hour
	}

	function EventGraphic(event,date,offset,scale=1) {
		scale /= 60000
		this.class  = "event"
		this.title  = event.title
		this.height = (event.end - event.start) * scale
		this.top    = (Number(event.start) - Number(date)) * scale - offset.px
		this.color  = event.color
		this.id     = event._id
		offset.px += this.height
	}

	function BlankDay() {
		this.head = ''
		this.events = []
		this.hours = []
	}

	function Day(initial,index,isLast,callback) {
		var midnight = $date.midnight($date.move(initial,0,0,index))
		var self = this
		EventFactory.get_by_date(midnight,function(events) {
			// console.log(midnight,events)
			self.events = events

			var hours = []
			for (var h = 0; h < $scope.hours.length; h++) {
				hours.push(new Hour($date.combine(midnight,$scope.hours[h])))
			}
			self.hours = hours

			self.event_links = []
			self.hour_links  = []
			var h = 0, e = 0
			var offset = new Offset(0)
			var content = []
			while (h < hours.length || e < events.length) {
				var l = content.length
				if ((hours[h] ? hours[h].time : Infinity) < (events[e] ? events[e].start : Infinity)) {
					content.push(new PlusBox(midnight,hours[h],offset))
					self.hour_links[h] = content[l]
					h++
				} else {
					content.push(new EventGraphic(events[e],midnight,offset))
					self.event_links[e] = content[l]
					e++
				}
			}
			console.log(index, self.event_links)
			self.content = function() {
				// console.log(135)
				$('.day').index(index,function(day_element) {
					setTimeout(function() {
						// $('.plus',day_element).every(function(element,h) {
						// 	// console.log(element)
						// })
						// $('.event',day_element).every(function(element,e) {
						// 	console.log(self.event_links[e])
						// })
						for (var h = 0; h < self.hours.length; h++) {
							$('#' + self.hour_links[h].id).it(function(element) {
								element.style.top    = self.hour_links[h].top     + 'px'
								element.style.height = self.hour_links[h].height  + 'px'
							})
						}
						for (var e = 0; e < self.events.length; e++) {
							$('#' + self.event_links[e].id).it(function(element) {
								// console.log(self.events[e],element)
								// element.style.fontWeight = 'bold'
								element.style.top    = self.event_links[e].top    + 'px'
								element.style.height = self.event_links[e].height + 'px'
								element.style.backgroundColor = events[e].color
							})
						}
					}, 0);
				})
				return content
			}
			// console.log(offset.px)
			self.head = midnight
			self.add_event = function(event) {
				var place = binary_search(event,content)
				for (var i = content.length - 1; i > place; i--) {
					content[i] = content[i-1]
				}
			}
			$scope.days[index] = self
			if (isLast) {
				callback()
			}
		})
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

	// function display(day,events) {
	// 	var str = ''
	// 	var off = 0
	// 	for (var i = 0; i < events.length; i++) {
	// 		var event = new EventGraphic(events[i],off)
	// 		str += event.str
	// 		off = event.off
	// 	}
	// 	var html = str
	// 	html += day.innerHTML
	// 	day.innerHTML = html
	// 	// console.log(off/60)
	// 	day.$('.plus').bottom(off)
	// }

// Scope Functions

	$scope.click = function(graphic) {
		if (graphic.__proto__.constructor.name == "PlusBox") {
			$scope.new(graphic.hour)
		}
	}

	$scope.new = function(hour) {
		hour = hour.time
		// $scope.new_event.dateE = new Date(Number(hour) + 3600000)
		// $scope.new_event.timeE = new Date(Number(hour) + 3600000)
		// $scope.new_event.dateS = hour
		// $scope.new_event.timeS = hour
		$scope.new_event.start = hour
		$scope.new_event.end   = new Date(Number(hour) + 3600000)
		$('#new-event').it(function(element) {
			element.style.display = 'inline-block'
		})
	}

	$scope.create = function() {
		// $scope.new_event.start = $date.combine($scope.new_event.dateS,$scope.new_event.timeS)
		// $scope.new_event.end   = $date.combine($scope.new_event.dateE,$scope.new_event.timeE)
		// $scope.new_event.dateS = undefined
		// $scope.new_event.timeS = undefined
		// $scope.new_event.dateE = undefined
		// $scope.new_event.timeE = undefined
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

	$scope.cross = function(option) {
		// if ($scope.days[0].head.getMonth() == $scope.days[nDays-1].head.getMonth()) {
		// 	return option == 0
		// } else if ($scope.days[0].head.getYear() == $scope.days[nDays-1].head.getYear()) {
		// 	return option == 1
		// } else {
		// 	return option == 2
		// }
		return option == 0
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