app.controller('Calendar',['$','$scope','$routeParams','$location','$date','EventFactory',
function                  ( $ , $scope , $routeParams , $location , $date , EventFactory) {

	var start = new Date($routeParams.year,$routeParams.month,$routeParams.date)

	console.log(start)

	EventFactory.get(function(content) {
		// var events = []
		// for (var i = 0; i < content.length; i++) {
		// 	events.push(new svg.Event(content[i]))
		// }
		var monday = $('.day').index(1)
		display(monday,content)
	})

	$scope.hours = [new Date(start)]
	for (var h = 1; h < 24; h++) {
		$scope.hours.push(start.setHours(start.getHours()+1))
	}

	// $scope.days = []
	// var day = start
	// for (var d = 0; d < 7; d++) {
	// 	$scope.days.push({'head':new Date(day)})
	// 	day += 86400000
	// }

	$scope.days = [{'head':new Date(start.setDate(start.getDate())),'hours':[]}]
	for (var d = 1; d < 7; d++) {
		$scope.days.push({'head':new Date(start.setDate(start.getDate()+1)),'hours':[]})
	}
	for (var d = 0; d < $scope.days.length; d++) {
		$scope.days[d]
		for (var h = 0; h < $scope.hours.length; h++) {
			$scope.days[d].hours[h] = $date.combine($scope.days[d].head,$scope.hours[h])
		}
	}
	console.log($scope.days)

	// $scope.times = []
	// for (var d = 0; d < $scope.days.length; d++) {
	// 	$scope.times[d] = []
	// 	for (var h = 0; h < $scope.hours.length; h++) {
	// 		$scope.times[d][h] = $date.combine($scope.days[d],$scope.hours[h])
	// 	}
	// }

	$scope.new_event = {
		'title' : '',
		'color' : '#facade',
	}

	$('.calendar-scroll').scrollTop = 530 // 8:50 AM to 5:10 PM

	$('#new-event').style.display = 'none'

	var time_bar_innerHTML = '<div class="midnight"></div>'
	for (var h = 1; h <= 11; h++) {
		time_bar_innerHTML += `<div class="hour">${h}:00 AM</div>`
	}
	time_bar_innerHTML += `<div class="hour">12:00 PM</div>`
	for (var h = 1; h <= 11; h++) {
		time_bar_innerHTML += `<div class="hour">${h}:00 PM</div>`
	}

	function display(day,events) {
		var str = ''
		var off = 0
		for (var i = 0; i < events.length; i++) {
			var event = new Event(events[i],off)
			str += event.str
			off = event.off
		}
		var html = str
		html += day.innerHTML
		day.innerHTML = html
		// console.log(off/60)
		day.$('.plus').bottom(off)
	}

	function Event(event,off=0) {
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

	$scope.delete = function(id) {
		EventFactory.delete(id)
	}

	$scope.print = function() {
		EventFactory.print()
	}

}])
