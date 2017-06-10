app.controller('IndexEvent',['$','$scope','$location','EventFactory',
	                function( $ , $scope , $location , EventFactory) {

	EventFactory.get(function(content) {
		$scope.events = content
		var svg = ''
		for (var i = 0; i < content.length; i++) {
			var event = content[i]
		}
	})

	// $.foo()

	function px(num) {
		return '' + num + 'px'
	}

	var timeW = 40
	var scrollBarW = 15

	var day_head = document.getElementsByClassName('day-head')
	var calendar = document.getElementsByClassName('calendar')
	var time_sep = document.getElementsByClassName('time-sep')

	var rwd = function() {

		// console.log('resize')

		var calW = window.innerWidth * 0.95 - scrollBarW 
		var dayW = px((calW - timeW) / 7)

		day_head[0].style.width = dayW
		day_head[1].style.width = dayW
		day_head[2].style.width = dayW
		day_head[3].style.width = dayW
		day_head[4].style.width = dayW
		day_head[5].style.width = dayW
		day_head[6].style.width = dayW

		calendar[0].style.width = px(calW)

		time_sep[0].style.width = px(timeW)

		// $scope.day_head = {
		// 	width: calW / 7
		// }
		// $scope.calendar = {
		// 	width: calW
		// }
		// $scope.time_sep = {
		// 	width: timeW
		// }
		
	}

	rwd()

	window.onresize = rwd

	$scope.delete = function(id) {
		EventFactory.delete(id)
	}

	$scope.print = function() {
		EventFactory.print()
	}

}])
