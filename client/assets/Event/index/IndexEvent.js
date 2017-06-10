app.controller('IndexEvent',['$','$scope','$location','EventFactory',
	                function( $ , $scope , $location , EventFactory) {

	EventFactory.get(function(content) {
		var events = []
		for (var i = 0; i < content.length; i++) {
			events.push(new svg.Event(content[i]))
		}
		rwd(events)
	})

	// $.foo()

	function px(num) {
		return String(num) + 'px'
	}

	var timeW = 48
	var scrollBarW = 15

	var day_head = document.getElementsByClassName('day-head')
	var calendar = document.getElementsByClassName('calendar')
	var time_sep = document.getElementsByClassName('time-sep')

	var rwd = function(events) {

		var calW = window.innerWidth * 0.95 - scrollBarW 
		var dayW = px((calW - timeW) / 7)

		// day_head[0].style.width = dayW
		// day_head[1].style.width = dayW
		// day_head[2].style.width = dayW
		// day_head[3].style.width = dayW
		// day_head[4].style.width = dayW
		// day_head[5].style.width = dayW
		// day_head[6].style.width = dayW

		// calendar[0].style.width = px(calW)

		time_sep[0].style.width = px(timeW)
		
		// var canvas = new $svg

		// var svg = ''
		// for (var i = 0; i < events.length; i++) {
		// 	svg += events[i].svg()
		// }
		

	}

	window.onresize = rwd

	$scope.delete = function(id) {
		EventFactory.delete(id)
	}

	$scope.print = function() {
		EventFactory.print()
	}

}])
