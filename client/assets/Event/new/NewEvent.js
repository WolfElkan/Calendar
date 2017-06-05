app.controller('NewEvent',['$scope','$location','$routeParams','$valid','EventFactory',function($scope,$location,$routeParams,$valid,EventFactory,) {

	$scope.event = {}

	$scope.create = function() {
		$scope.errors = {}
		var event = $scope.event
		var obj = $valid.ate(EventFactory,event)
		if (obj.valid) {
			EventFactory.create(event).then(function(returned) {
				if (returned.status == 200) {
					$location.url('/events')
				}
			})
		} else {
			$valid.blame($scope,obj)
		}
	}

	$scope.print = function() {
		console.log($scope.event)
	}

}])
