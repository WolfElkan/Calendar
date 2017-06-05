app.controller('NewTask',['$scope','$location','$routeParams','$valid','TaskFactory',function($scope,$location,$routeParams,$valid,TaskFactory,) {

	$scope.task = {}

	$scope.create = function() {
		$scope.errors = {}
		var task = $scope.task
		var obj = $valid.ate(TaskFactory,task)
		if (obj.valid) {
			TaskFactory.create(task).then(function(returned) {
				if (returned.status == 200) {
					$location.url('/tasks')
				}
			})
		} else {
			$valid.blame($scope,obj)
		}
	}

	$scope.print = function() {
		console.log($scope.task)
	}

}])
