app.controller('IndexEvent',['$','$scope','$location','EventFactory',
	                function( $ , $scope , $location , EventFactory) {

	EventFactory.get(function(content) {
		var events = []
		for (var i = 0; i < content.length; i++) {
			events.push(new svg.Event(content[i]))
		}
	})



	// $.foo()

	// console.log()

	// var calendar = document.getElementsByClassName('calendar')[0]
	var calendar = $('.calendar')
	console.log(calendar)

	$scope.delete = function(id) {
		EventFactory.delete(id)
	}

	$scope.print = function() {
		EventFactory.print()
	}

}])
