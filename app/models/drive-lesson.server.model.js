'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Drive lesson Schema
 */
var DriveLessonSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Drive lesson name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('DriveLesson', DriveLessonSchema);