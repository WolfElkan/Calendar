app.controller('Calendar',['$','$scope','$routeParams','$location','$date','EventFactory',
function                  ( $ , $scope , $routeParams , $location , $date , EventFactory) {

	function print(obj) {
		for (key in obj) {
			console.log(key,':',obj)
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

	$scope.hours = []
	for (var h = 0; h < 24; h++) {
		$scope.hours.push($date.move(start,0,0,0,h))
	}

	function Hour(time) {
		this.time = time
		this.print = function() {}
	}

	function Day(initial,plus_days) {
		var midnight = $date.move($date.midnight(initial),0,0,plus_days)
		this.head = midnight
		this.hours = []
		for (var h = 0; h < $scope.hours.length; h++) {
			this.hours.push($date.combine(midnight,$scope.hours[h]))
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
			// var html = this.head + '<br>&#x1f984;'
			element.innerHTML = html
		}
	}

	function Event(data) {
		// body...
	}

	$scope.days = []
	for (var d = 0; d < 7; d++) {
		$scope.days.push(new Day(start,d))
	}

	for (var i = 0; i < $scope.days.length; i++) {
		$scope.days[i]
	}

	$('.day').every(function(day,i) {
		// day.innerHTML = i + '&#x1f984;'
		$scope.days[i].print(day)
	})

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

	function EventGraphic(event,off=0) {
		var title = event.title
		var timeS = event.timeS /= 1
		var timeE = event.timeE /= 1
		var color = event.color
		var top = timeS - off
		var height = timeE - timeS
		this.str = `
<div class="event" style="top: ${top}px; height: ${height}px; background-color: ${color}">${title}</div>`
		off += height
		this.off = off
	}

	$scope.new = function(hour) {
		$scope.new_event.dateE = new Date(Number(hour) + 3600000)
		$scope.new_event.timeE = new Date(Number(hour) + 3600000)
		$scope.new_event.dateS = hour
		$scope.new_event.timeS = hour
		$('#new-event').style.display = 'inline-block'
	}

	$scope.create = function() {
		$scope.new_event.start = $date.combine($scope.new_event.dateS,$scope.new_event.timeS)
		$scope.new_event.end   = $date.combine($scope.new_event.dateE,$scope.new_event.timeE)
		$scope.new_event.dateS = undefined
		$scope.new_event.timeS = undefined
		$scope.new_event.dateE = undefined
		$scope.new_event.timeE = undefined
		console.log($scope.new_event)
		EventFactory.create($scope.new_event)
		$('#new-event').style.display = 'none'
	}

	$scope.cancel = function() {
		$('#new-event').style.display = 'none'
	}

	$scope.xMonth = function() {
		return $scope.days[0].head.getMonth() != $scope.days[6].head.getMonth()
	}

	$scope.delete = function(id) {
		EventFactory.delete(id)
	}

	$scope.nav = function(dDays) {
		go($date.move(start,0,0,dDays))
	}

	$scope.print = function() {
		console.log('load')
		var x = $('.day')
		console.log(x)
		// EventFactory.print()
	}

}])