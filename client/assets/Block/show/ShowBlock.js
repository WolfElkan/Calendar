app.controller('ShowBlock',['$scope','$location','$routeParams','$find','BlockFactory',function($scope,$location,$routeParams,$find,BlockFactory,) {

	var id = $routeParams.id

	BlockFactory.get(function(content) {
		$scope.block = $find.element(content,id)
	})

	$scope.delete = function(id) {
		BlockFactory.delete(id)
	}

	$scope.print = function() {
		BlockFactory.print( )
	}

}])
