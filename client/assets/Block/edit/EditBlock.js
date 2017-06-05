app.controller('EditBlock',['$scope','$location','$routeParams','$find','BlockFactory',function($scope,$location,$routeParams,$find,BlockFactory,) {

	var id = $routeParams.id

	BlockFactory.get(function(content) {
		$scope.block = $find.clone(content,id)
	})

	$scope.update = function() {
		BlockFactory.update(id,$scope.block).then(function( ) {
			$location.url('/blocks')
		})
	}

	$scope.delete = function(id) {
		BlockFactory.delete(id)
		$location.url('/blocks')
	}

	$scope.print = function() {
		console.log($scope.block)
	}

}])
