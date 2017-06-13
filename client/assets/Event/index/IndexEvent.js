app.controller('IndexEvent',['$','$sce','$scope','$location','EventFactory',
	                function( $ , $sce , $scope , $location , EventFactory) {

	EventFactory.get(function(content) {
		var events = []
		for (var i = 0; i < content.length; i++) {
			events.push(new svg.Event(content[i]))
		}
	})

	// $scope.events = 
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
