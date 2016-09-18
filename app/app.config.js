/**
 * Load modules for application
 */

angular
    .module('app', [
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'ui.utils',
        'ui.jq'
    ])

    .constant('CONFIG', 
    {
	    DebugMode: true,
	    StepCounter: 0,
	    APIHost: 'http://localhost:12017',
        baseUrl: 'http://localhost/knaut/'
        //staging http://knaut.ecodepoint.com/ 
        //local  http://localhost/knaut/ 
	}); 