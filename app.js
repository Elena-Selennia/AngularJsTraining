angular.module('app', [])
	.controller('AppCtrl', function($scope) {
		$scope.messages = {};
				$scope.messages.list = [];
				$scope.messages.add = function(message) {
					$scope.messages.list.push(message);
				};
		
		$scope.$on('okSubmit', function(event, data) {
			$scope.messages = data;
		})
		$scope.$broadcast('okSubmit', $scope.messages);
	})
	.directive('inputTextDir', function() {
		return {
			restrict: "AE",
			template: '<h2>Enter your text here:</h2>' +
				'<form ng-submit="addNewMessage(newMessage)">' + 
				'<input type="text" ng-model="newMessage">' +
				'<button type="submit">OK</button>' + 
				'</form>',
			link: function ($scope, $elem, $attrs) {
				
				$scope.newMessage = 'Hello world';
				$scope.addNewMessage = function(message) {
					$scope.messages.add(message);
					$scope.newMessage = '';
				}
				$scope.$emit('okSubmit', $scope.messages);
			}
		}
	})
	.directive('outputTextDir', function() {
		return {
			restrict: "AE",
			template: '<p ng-repeat="message in messages.list">{{ message }}</p>',
			link: function ($scope, $elem, $attrs) {
				$scope.$on('okSubmit', function(event, data) {
					$scope.messages = data;
				})
			}
		}
	 })