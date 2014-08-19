'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	DriveLesson = mongoose.model('DriveLesson'),
	_ = require('lodash');

/**
 * Create a Drive lesson
 */
exports.create = function(req, res) {
	var driveLesson = new DriveLesson(req.body);
	driveLesson.user = req.user;

	driveLesson.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(driveLesson);
		}
	});
};

/**
 * Show the current Drive lesson
 */
exports.read = function(req, res) {
	res.jsonp(req.driveLesson);
};

/**
 * Update a Drive lesson
 */
exports.update = function(req, res) {
	var driveLesson = req.driveLesson ;

	driveLesson = _.extend(driveLesson , req.body);

	driveLesson.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(driveLesson);
		}
	});
};

/**
 * Delete an Drive lesson
 */
exports.delete = function(req, res) {
	var driveLesson = req.driveLesson ;

	driveLesson.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(driveLesson);
		}
	});
};

/**
 * List of Drive lessons
 */
exports.list = function(req, res) { DriveLesson.find().sort('-created').populate('user', 'displayName').exec(function(err, driveLessons) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(driveLessons);
		}
	});
};

/**
 * Drive lesson middleware
 */
exports.driveLessonByID = function(req, res, next, id) { DriveLesson.findById(id).populate('user', 'displayName').exec(function(err, driveLesson) {
		if (err) return next(err);
		if (! driveLesson) return next(new Error('Failed to load Drive lesson ' + id));
		req.driveLesson = driveLesson ;
		next();
	});
};

/**
 * Drive lesson authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.driveLesson.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};