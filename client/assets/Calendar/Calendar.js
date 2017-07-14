app.controller('Calendar',
		['$','$scope','$routeParams','$location','$compile','$date','$find','EventFactory',
function( $ , $scope , $routeParams , $location , $compile , $date , $find , EventFactory) {

	if (!$routeParams.year) {
		var now = new Date()
		now -= now.getDay() * 86400000
		go(now)
	} else {
		var start = new Date($routeParams.year,$routeParams.month,$routeParams.date)
		if (Number(start)) {
			if (
				$routeParams.date  != start.getDate()  ||
				$routeParams.month != start.getMonth() ||
				$routeParams.year  != start.getFullYear() 
			) {
				go(start)
			} else {
				$scope.nDays = 7
				page_setup($scope)
				populate($scope)
			}
		}
	}

	function go(date) {
		date = new Date(date)
		var url = 'calendar?view=week'
		url += '&year=' + date.getFullYear()
		url += '&month='+ date.getMonth()
		url += '&date=' + date.getDate()
		$location.url(url)
	}

	// Constructors

	function Offset(px=0) {
		this.px = px
		// Adding more lines so I can collapse it
		// I know, so professional
	}

	function Hour(time) {
		this.time = time
		var plus_id = "plus"
		plus_id += time.getDay()
		plus_id += time.getHours() < 10 ? '0' : ''
		plus_id += time.getHours()
		this.plus_id = plus_id
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
		var self = this
		var midnight = $date.midnight($date.move(initial,0,0,index))
		EventFactory.get_by_date(midnight,function(events) {
			self.events = events
			var hours = []
			for (var h = 0; h < $scope.hours.length; h++) {
				hours.push(new Hour($date.combine(midnight,$scope.hours[h])))
			}
			self.hours = hours
			self.event_links = []
			self.hour_links  = []
			var h = 0, e = 0
			var offset = new Offset
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
			self.content = function() {
				$('.day').index(index,function(day_element) {
					setTimeout(function() {
						for (var h = 0; h < self.hours.length; h++) {
							$('#' + self.hour_links[h].id).it(function(element) {
								element.style.top    = self.hour_links[h].top     + 'px'
								element.style.height = self.hour_links[h].height  + 'px'
							})
						}
						for (var e = 0; e < self.events.length; e++) {
							$('#' + self.event_links[e].id).it(function(element) {
								element.style.top    = self.event_links[e].top    + 'px'
								element.style.height = self.event_links[e].height + 'px'
								element.style.backgroundColor = events[e].color
							})
						}
					}, 0);
				})
				return content
			}
			self.head = midnight
			self.add_event = function(event) {
				// content.push(event)
				// var place = $find.binary(content,Number(event.start),['start',Number])
				// place = Math.floor(place)
				// for (var i = content.length - 1; i > place; i--) {
				// 	content[i] = content[i-1]
				// }
			}
			$scope.days[index] = self
			if (isLast) {
				callback()
			}
		})
	}

	// Action Functions

	function page_setup($scope) {

		$scope.new_event = {
			'title' : '',
			'color' : '#facade',
		}

		$('#calendar-scroll').it(function(element) {
			element.scrollTop = 530 // 8:50 AM to 5:10 PM
		})
	}

	function populate($scope) {

		$scope.hours = []
		
		for (var h = 0; h < 24; h++) {
			$scope.hours.push($date.move(start,0,0,0,h))
		}

		var nDays = $scope.nDays

		$scope.days = []
		
		for (var d = 0; d < nDays; d++) {
			$scope.days.push(new BlankDay)
		}

		for (var d = 0; d < nDays; d++) {
			new Day(start,d,(d == nDays-1),function() {
				add_scope_methods($scope)
			})
		}
	}

	function add_scope_methods($scope) {

		$scope.click = function(graphic) {
			if (graphic.__proto__.constructor == PlusBox) {
				$scope.new(graphic.hour)
			}
		}

		$scope.new = function(hour) {
			hour = hour.time
			$scope.new_event.start = hour
			$scope.new_event.end   = new Date(Number(hour) + 3600000)
			$('#new-event').it(function(element) {
				element.style.display = 'inline-block'
			})
		}

		$scope.create = function() {
			EventFactory.create($scope.new_event,function(created_event) {
				console.log(created_event)
				var day = $find.binary($scope.days,Number(created_event.start),['events','start',Number])
				day = $scope.days[day]
				day.add_event(created_event)
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
			var lDay = $scope.nDays - 1
			if ($scope.days[0].head.getMonth() == $scope.days[lDay].head.getMonth()) {
				return option == 0
			} else if ($scope.days[0].head.getYear() == $scope.days[lDay].head.getYear()) {
				return option == 1
			} else {
				return option == 2
			}
		}

		$scope.range = function(lo,hi,inc=1) {
			var result = []
			for (var i = lo; i <= hi; i+=inc) {
				result.push(i)
			}
			return result
		}
	}

	// Utilities

	function print(obj) {
		for (key in obj) {
			console.log(key,':',obj)
		}
	}

	// $scope.print = function() {
	// 	EventFactory.print()
	// }

}])