'use strict';

// Drive lessons controller
angular.module('drive-lessons').controller('DriveLessonsController', ['$scope', '$stateParams', '$location', 'Authentication', 'DriveLessons',
	function($scope, $stateParams, $location, Authentication, DriveLessons ) {
		$scope.authentication = Authentication;

		// Create new Drive lesson
		$scope.create = function() {
			// Create new Drive lesson object
			var driveLesson = new DriveLessons ({
				name: this.name
			});

			// Redirect after save
			driveLesson.$save(function(response) {
				$location.path('drive-lessons/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Drive lesson
		$scope.remove = function( driveLesson ) {
			if ( driveLesson ) { driveLesson.$remove();

				for (var i in $scope.driveLessons ) {
					if ($scope.driveLessons [i] === driveLesson ) {
						$scope.driveLessons.splice(i, 1);
					}
				}
			} else {
				$scope.driveLesson.$remove(function() {
					$location.path('drive-lessons');
				});
			}
		};

		// Update existing Drive lesson
		$scope.update = function() {
			var driveLesson = $scope.driveLesson ;

			driveLesson.$update(function() {
				$location.path('drive-lessons/' + driveLesson._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Drive lessons
		$scope.find = function() {
			$scope.driveLessons = DriveLessons.query();
		};

		// Find existing Drive lesson
		$scope.findOne = function() {
			$scope.driveLesson = DriveLessons.get({ 
				driveLessonId: $stateParams.driveLessonId
			});
		};
	}
]);