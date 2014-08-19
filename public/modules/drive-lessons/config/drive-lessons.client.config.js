'use strict';

// Configuring the Articles module
angular.module('drive-lessons').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Drive lessons', 'drive-lessons', 'dropdown', '/drive-lessons(/create)?');
		Menus.addSubMenuItem('topbar', 'drive-lessons', 'List Drive lessons', 'drive-lessons');
		Menus.addSubMenuItem('topbar', 'drive-lessons', 'New Drive lesson', 'drive-lessons/create');
	}
]);