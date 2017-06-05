app.controller('IndexEvent',['$scope','$location','EventFactory',function($scope,$location,EventFactory) {

	EventFactory.get(function(content) {
		$scope.events = content
	})

	$scope.delete = function(id) {
		EventFactory.delete(id)
	}

	$scope.print = function() {
		EventFactory.print( )
	}

}])
