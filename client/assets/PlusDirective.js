angular.module('app.directives._plus',[]).directive('plus',function() {
	return {
		restrict  : 'A',
		scope     : {
			top   : '=',
			height: '=',
			time  : '=',
		},
		// template  : "<button ng-click='moo({{$scope.time}})'>",
		// template  : '<div class="plus" ng-click="new({{time}})">+</div>',
		template  : 'bar',
		controller: function($scope) {
			console.log($scope.time)
		}
	}
})