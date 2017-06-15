app.controller('Calendar',['$','$scope','$routeParams','$location','EventFactory',
function                  ( $ , $scope , $routeParams , $location , EventFactory) {

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

	$scope.days = [
	start.setDate(start.getDate()),
	start.setDate(start.getDate()+1),
	start.setDate(start.getDate()+1),
	start.setDate(start.getDate()+1),
	start.setDate(start.getDate()+1),
	start.setDate(start.getDate()+1),
	start.setDate(start.getDate()+1)]

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
	
	$('.time-bar').innerHTML = time_bar_innerHTML

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

	$scope.new = function() {
		$('#new-event').style.display = 'inline-block'
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
