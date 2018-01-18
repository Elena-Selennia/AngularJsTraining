angular.module('app', [])
	.controller('AppCtrl', function($scope){
		$scope.a = 0;
		$scope.b = 0;
		$scope.counter = function() {
			return ++$scope.a;
		};
	});
	
var counterJS = function() {
	var $scope = angular.element($("#2")).scope();
	++$scope.b;
	$scope.$apply();
}	