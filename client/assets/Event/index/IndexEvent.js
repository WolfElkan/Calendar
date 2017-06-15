app.controller('IndexEvent',['$','$scope','$location','EventFactory',
	                function( $ , $scope , $location , EventFactory) {

	EventFactory.get(function(content) {
		// var events = []
		// for (var i = 0; i < content.length; i++) {
		// 	events.push(new svg.Event(content[i]))
		// }
		var monday = $('.day').index(1)
		display(monday,content)
	})

	$scope.sun = 11

	$('.calendar-scroll').scrollTop = 530 // 8:50 AM to 5:10 PM
	$('#new-event').style.display = 'none'

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

	$scope.new = function function_name() {
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
