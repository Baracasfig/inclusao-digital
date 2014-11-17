'use strict';

angular.module('inclusaoDigitalApp')
	.controller('MainCtrl', function ($scope, localStorageService) {
		$scope.slideType = 1;
		$scope.user = {};
		$scope.appNome = 'ID';

		$scope.prevSlide = function() {
			if($scope.slideType > 1){
				$scope.slideType += 1;
			}
			else {
				$scope.slideType = 3;
			}
		};

		$scope.nextSlide = function() {
			if ($scope.slideType < 3){
				$scope.slideType += 1;
			}
			else {
				$scope.slideType = 1;
			}
		};

		$scope.userEmail = localStorageService.get('email');

		console.log($scope.userEmail);

	});
