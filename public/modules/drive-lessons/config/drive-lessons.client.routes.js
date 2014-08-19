'use strict';

//Setting up route
angular.module('drive-lessons').config(['$stateProvider',
	function($stateProvider) {
		// Drive lessons state routing
		$stateProvider.
		state('listDriveLessons', {
			url: '/drive-lessons',
			templateUrl: 'modules/drive-lessons/views/list-drive-lessons.client.view.html'
		}).
		state('createDriveLesson', {
			url: '/drive-lessons/create',
			templateUrl: 'modules/drive-lessons/views/create-drive-lesson.client.view.html'
		}).
		state('viewDriveLesson', {
			url: '/drive-lessons/:driveLessonId',
			templateUrl: 'modules/drive-lessons/views/view-drive-lesson.client.view.html'
		}).
		state('editDriveLesson', {
			url: '/drive-lessons/:driveLessonId/edit',
			templateUrl: 'modules/drive-lessons/views/edit-drive-lesson.client.view.html'
		});
	}
]);