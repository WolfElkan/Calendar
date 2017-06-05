app.controller('ShowTask',['$scope','$location','$routeParams','$find','TaskFactory',function($scope,$location,$routeParams,$find,TaskFactory,) {

	var id = $routeParams.id

	TaskFactory.get(function(content) {
		$scope.task = $find.element(content,id)
	})

	$scope.delete = function(id) {
		TaskFactory.delete(id)
	}

	$scope.print = function() {
		TaskFactory.print( )
	}

}])
