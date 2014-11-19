'use strict';

angular.module('inclusaoDigitalApp')
	.controller('MainCtrl', function ($scope, localStorageService) {
		$scope.slideType = 1;
		$scope.isAdmin = false;

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
		$scope.userEmail = localStorageService.get('user.email');

		if($scope.userEmail == "baracasfig@gmail.com"){
			$scope.isAdmin = true;
		}

	});
