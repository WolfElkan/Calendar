app.controller('EditTask',['$scope','$location','$routeParams','$find','TaskFactory',function($scope,$location,$routeParams,$find,TaskFactory,) {

	var id = $routeParams.id

	TaskFactory.get(function(content) {
		$scope.task = $find.clone(content,id)
	})

	$scope.update = function() {
		TaskFactory.update(id,$scope.task).then(function( ) {
			$location.url('/tasks')
		})
	}

	$scope.delete = function(id) {
		TaskFactory.delete(id)
		$location.url('/tasks')
	}

	$scope.print = function() {
		console.log($scope.task)
	}

}])
