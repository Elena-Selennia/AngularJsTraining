angular.module('app', [])
	.controller("AppController", function ($scope) {
		$scope.title = "Hello, world!";
	})
	.directive('tabControl', function() {
		return {
			restrict: 'E',
			transclude: true,
			scope: {},
			template: '<div>' +
						'<ul class="nav nav-tabs">' +
						'<li ng-repeat="pane in tabControl.panes" ng-class="{&#39;active&#39;: pane.active}">' +
						'<a href="" ng-click="tabControl.select(pane)">{{pane.title}}</a>' +
						'</li>' +
						'</ul>' +
						'<ng-transclude></ng-transclude>' +
						'</div>',
			controllerAs: 'tabControl',
			controller: function() {
				var self = this;
				self.panes = [];
				self.registerPane = function registerPane(pane) {
					self.panes.push(pane);
					if (self.panes.length === 1) {
						pane.active = true;
					}
				};
				self.select = function(selectedPane) {
					angular.forEach(self.panes, function(pane) {
						if (pane.active && pane !== selectedPane) {
							pane.active = false;
						}
					});
					selectedPane.active = true;
				}
			}
		}
	})
	.directive('pane', function() {
		return {
			restrict: 'E',
			transclude: true,
			template: '<div ng-show="active" ng-transclude></div>',
			require: '^tabControl',
			scope: {
				title: '@'
			},
			link: function(scope, elem, attr, tabControlCtrl) {
				scope.active = false;
				tabControlCtrl.registerPane(scope);
			}
		}
	})
