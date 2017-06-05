app.controller('ShowEvent',['$scope','$location','$routeParams','$find','EventFactory',function($scope,$location,$routeParams,$find,EventFactory,) {

	var id = $routeParams.id

	EventFactory.get(function(content) {
		$scope.event = $find.element(content,id)
	})

	$scope.delete = function(id) {
		EventFactory.delete(id)
	}

	$scope.print = function() {
		EventFactory.print( )
	}

}])
