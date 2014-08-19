'use strict';

//Drive lessons service used to communicate Drive lessons REST endpoints
angular.module('drive-lessons').factory('DriveLessons', ['$resource',
	function($resource) {
		return $resource('drive-lessons/:driveLessonId', { driveLessonId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);