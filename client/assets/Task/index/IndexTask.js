app.controller('IndexTask',['$scope','$location','TaskFactory',function($scope,$location,TaskFactory) {

	TaskFactory.get(function(content) {
		$scope.tasks = content
	})

	$scope.delete = function(id) {
		TaskFactory.delete(id)
	}

	$scope.print = function() {
		TaskFactory.print( )
	}

}])
