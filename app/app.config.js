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
        'ui.jq',
        'validation', 
        'validation.rule',
        'ckeditor',
        'ajaxServices',
        'cgBusy',
    ])

    .constant('CONFIG', 
    {
	    DebugMode: true,
	    StepCounter: 0,
	    ApiUrl: 'http://api.knaut.ecodepoint.com/firstapi/',
        baseUrl: 'http://localhost/knaut/', //local
        //baseUrl: 'http://knaut.ecodepoint.com/' //staging
	}); 