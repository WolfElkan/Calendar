app.controller('IndexBlock',['$scope','$location','BlockFactory',function($scope,$location,BlockFactory) {

	BlockFactory.get(function(content) {
		$scope.blocks = content
	})

	$scope.delete = function(id) {
		BlockFactory.delete(id)
	}

	$scope.print = function() {
		BlockFactory.print( )
	}

}])
