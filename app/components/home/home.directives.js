angular.module('knaut')

    .directive('heroBlock',["CONFIG", function(CONFIG) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/home/views/heroblock.view.html'
        };
    }])
    .directive('subSection', ["CONFIG", function(CONFIG) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/home/views/subsection.view.html'
        };
	}]);