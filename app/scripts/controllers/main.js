'use strict';

angular.module('inclusaoDigitalApp')
	.controller('MainCtrl', function ($scope) {
		$scope.slideType = 1;

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
	});
