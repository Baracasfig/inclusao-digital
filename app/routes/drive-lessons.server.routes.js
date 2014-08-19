'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var driveLessons = require('../../app/controllers/drive-lessons');

	// Drive lessons Routes
	app.route('/drive-lessons')
		.get(driveLessons.list)
		.post(users.requiresLogin, driveLessons.create);

	app.route('/drive-lessons/:driveLessonId')
		.get(driveLessons.read)
		.put(users.requiresLogin, driveLessons.hasAuthorization, driveLessons.update)
		.delete(users.requiresLogin, driveLessons.hasAuthorization, driveLessons.delete);

	// Finish by binding the Drive lesson middleware
	app.param('driveLessonId', driveLessons.driveLessonByID);
};