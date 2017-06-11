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

	// console.log()

	var timeW = 48 // Dependent change: style.css:32
	var scrollBarW = 15

	var day_head = document.getElementsByClassName('day-head')
	var calendar = document.getElementsByClassName('calendar')
	var time_sep = document.getElementsByClassName('time-sep')

	var svg = `
	<line x1="${timeW}" x2="${timeW}" y1="0" y2="1200" style="stroke:#888;stroke-width:1"/>
	<polygon points="200,10 250,190 160,210" style="fill:lime;stroke:purple;stroke-width:1" ng-click="print()"/>
	`

	var rwd = function(events) {

		var calW = window.innerWidth * 0.95 - scrollBarW 
		var dayW = px((calW - timeW) / 7)

		time_sep[0].style.width = px(timeW)
		
		// var canvas = new $svg.Canvas()


		// for (var i = 0; i < events.length; i++) {
		// 	svg += events[i].svg()
		// }
		
		document.getElementsByTagName('svg')[0].innerHTML = svg

	}

	window.onresize = rwd

	$scope.delete = function(id) {
		EventFactory.delete(id)
	}

	$scope.print = function() {
		EventFactory.print()
	}

}])
