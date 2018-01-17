angular.module('app', [])
	.factory('messagesService', function(){
		var messages = {};
		messages.list = [];
		messages.add = function(message) {
			messages.list.push(message);
		};
		return messages;
		})
	.directive('inputTextDir', ['messagesService', function(messages) {
		return {
			restrict: "AE",
			scope: {},
			template: '<h2>Enter your text here:</h2>' +
						'<form ng-submit="addNewMessage(newMessage)">' + 
						'<input type="text" ng-model="newMessage">' +
						'<button type="submit">OK</button>' + 
						'</form>',
			link: function (scope, elem, attrs) {
				scope.newMessage = 'Hello world';
				scope.addNewMessage = function(message) {
					messages.add(message);
					scope.newMessage = '';
				}
			}
		}
	}])
	.directive('outputTextDir', ['messagesService', function(messages) {
		return {
			restrict: "AE",
			scope: {},
			template: '<p ng-repeat="message in messages">{{ message }}</p>',
			link: function (scope, elem, attrs) {
				scope.messages = messages.list;
			}
		}
	}])

