'use strict';

(function() {
	// Drive lessons Controller Spec
	describe('Drive lessons Controller Tests', function() {
		// Initialize global variables
		var DriveLessonsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Drive lessons controller.
			DriveLessonsController = $controller('DriveLessonsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Drive lesson object fetched from XHR', inject(function(DriveLessons) {
			// Create sample Drive lesson using the Drive lessons service
			var sampleDriveLesson = new DriveLessons({
				name: 'New Drive lesson'
			});

			// Create a sample Drive lessons array that includes the new Drive lesson
			var sampleDriveLessons = [sampleDriveLesson];

			// Set GET response
			$httpBackend.expectGET('drive-lessons').respond(sampleDriveLessons);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.driveLessons).toEqualData(sampleDriveLessons);
		}));

		it('$scope.findOne() should create an array with one Drive lesson object fetched from XHR using a driveLessonId URL parameter', inject(function(DriveLessons) {
			// Define a sample Drive lesson object
			var sampleDriveLesson = new DriveLessons({
				name: 'New Drive lesson'
			});

			// Set the URL parameter
			$stateParams.driveLessonId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/drive-lessons\/([0-9a-fA-F]{24})$/).respond(sampleDriveLesson);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.driveLesson).toEqualData(sampleDriveLesson);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(DriveLessons) {
			// Create a sample Drive lesson object
			var sampleDriveLessonPostData = new DriveLessons({
				name: 'New Drive lesson'
			});

			// Create a sample Drive lesson response
			var sampleDriveLessonResponse = new DriveLessons({
				_id: '525cf20451979dea2c000001',
				name: 'New Drive lesson'
			});

			// Fixture mock form input values
			scope.name = 'New Drive lesson';

			// Set POST response
			$httpBackend.expectPOST('drive-lessons', sampleDriveLessonPostData).respond(sampleDriveLessonResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Drive lesson was created
			expect($location.path()).toBe('/drive-lessons/' + sampleDriveLessonResponse._id);
		}));

		it('$scope.update() should update a valid Drive lesson', inject(function(DriveLessons) {
			// Define a sample Drive lesson put data
			var sampleDriveLessonPutData = new DriveLessons({
				_id: '525cf20451979dea2c000001',
				name: 'New Drive lesson'
			});

			// Mock Drive lesson in scope
			scope.driveLesson = sampleDriveLessonPutData;

			// Set PUT response
			$httpBackend.expectPUT(/drive-lessons\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/drive-lessons/' + sampleDriveLessonPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid driveLessonId and remove the Drive lesson from the scope', inject(function(DriveLessons) {
			// Create new Drive lesson object
			var sampleDriveLesson = new DriveLessons({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Drive lessons array and include the Drive lesson
			scope.driveLessons = [sampleDriveLesson];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/drive-lessons\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDriveLesson);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.driveLessons.length).toBe(0);
		}));
	});
}());