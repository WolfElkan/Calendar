app.controller('EditEvent',['$scope','$location','$routeParams','$find','EventFactory',function($scope,$location,$routeParams,$find,EventFactory,) {

	var id = $routeParams.id

	EventFactory.get(function(content) {
		$scope.event = $find.clone(content,id)
	})

	$scope.update = function() {
		EventFactory.update(id,$scope.event).then(function( ) {
			$location.url('/events')
		})
	}

	$scope.delete = function(id) {
		EventFactory.delete(id)
		$location.url('/events')
	}

	$scope.print = function() {
		console.log($scope.event)
	}

}])
