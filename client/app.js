var app = angular.module('app', ['ngRoute','ngSanitize'])

app.config(function($routeProvider) {
	$routeProvider.when('/blocks/edit/:id',{
		templateUrl : 'assets/Block/edit/EditBlock.html',
		controller  : 'EditBlock'
	})
	$routeProvider.when('/blocks',{
		templateUrl : 'assets/Block/index/IndexBlock.html',
		controller  : 'IndexBlock'
	})
	$routeProvider.when('/blocks/new',{
		templateUrl : 'assets/Block/new/NewBlock.html',
		controller  : 'NewBlock'
	})
	$routeProvider.when('/blocks/show/:id',{
		templateUrl : 'assets/Block/show/ShowBlock.html',
		controller  : 'ShowBlock'
	})

	$routeProvider.when('/calendar',{
		templateUrl : 'assets/Calendar/week7.html',
		controller  : 'Calendar'
	})

	$routeProvider.when('/tasks/edit/:id',{
		templateUrl : 'assets/Task/edit/EditTask.html',
		controller  : 'EditTask'
	})
	$routeProvider.when('/tasks',{
		templateUrl : 'assets/Task/index/IndexTask.html',
		controller  : 'IndexTask'
	})
	$routeProvider.when('/tasks/new',{
		templateUrl : 'assets/Task/new/NewTask.html',
		controller  : 'NewTask'
	})
	$routeProvider.when('/tasks/show/:id',{
		templateUrl : 'assets/Task/show/ShowTask.html',
		controller  : 'ShowTask'
	})
	$routeProvider.otherwise({
		redirectTo: '/calendar'
	})
})