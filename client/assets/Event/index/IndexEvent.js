app.controller('IndexEvent',['$scope','$location','EventFactory',function($scope,$location,EventFactory) {

	EventFactory.get(function(content) {
		$scope.events = content
		var svg = ''
		for (var i = 0; i < content.length; i++) {
			var event = content[i]
		}
	})

	var timeW = 35
	var scrollBarW = 15

	window.onresize = function() {

		var calW = window.innerWidth * 0.95 - scrollBarW - timeW

		$scope.day_head = {
			width: calW / 7
		}
		$scope.calendar = {
			width: calW
		}
		$scope.time_sep = {
			width: timeW
		}
		
	}

	$scope.delete = function(id) {
		EventFactory.delete(id)
	}

	$scope.print = function() {
		EventFactory.print()
	}

}])
