angular.module('app',[]).controller('AppCtrl', function($scope, $interval) {
	$scope.getMessage = function() {
		$scope.sec = 0;
		$scope.sec1 = 0;
		setInterval(function() {
			$scope.$apply(function() {
				++$scope.sec;
			});
		}, 1000);
		$interval(function() {
			++$scope.sec1;
		}, 1000)
	};

	$scope.getMessage();
});