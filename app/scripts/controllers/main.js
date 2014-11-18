'use strict';

angular.module('inclusaoDigitalApp')
	.controller('MainCtrl', function ($scope) {
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

		//user email
		// $scope.userEmail = localStorageService.get('email');

	});
