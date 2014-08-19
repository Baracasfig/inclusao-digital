'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	DriveLesson = mongoose.model('DriveLesson');

/**
 * Globals
 */
var user, driveLesson;

/**
 * Unit tests
 */
describe('Drive lesson Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			driveLesson = new DriveLesson({
				name: 'Drive lesson Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return driveLesson.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			driveLesson.name = '';

			return driveLesson.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		DriveLesson.remove().exec();
		User.remove().exec();

		done();
	});
});