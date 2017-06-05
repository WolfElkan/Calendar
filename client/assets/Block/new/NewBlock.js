app.controller('NewBlock',['$scope','$location','$routeParams','$valid','BlockFactory',function($scope,$location,$routeParams,$valid,BlockFactory,) {

	$scope.block = {}

	$scope.create = function() {
		$scope.errors = {}
		var block = $scope.block
		var obj = $valid.ate(BlockFactory,block)
		if (obj.valid) {
			BlockFactory.create(block).then(function(returned) {
				if (returned.status == 200) {
					$location.url('/blocks')
				}
			})
		} else {
			$valid.blame($scope,obj)
		}
	}

	$scope.print = function() {
		console.log($scope.block)
	}

}])
