/**
 * Load modules for application
 */

angular
    
    .module('knaut', [
        'ui.router',
        'knaut.homeServices'
    ])

    .constant('CONFIG', 
    {
	    DebugMode: true,
	    StepCounter: 0,
	    APIHost: 'http://localhost:12017',
        baseUrl: 'http://localhost/knaut'
	}); 