angular.module('app')

    .directive('homeHeaderNavBar',["CONFIG", function(CONFIG) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/home/views/common/home.common.header.navbar.view.html'
        };
    }])
    .directive('homeBanner', ["CONFIG", function(CONFIG) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/home/views/home.banner.view.html'
        };
	}])

    .directive('homeKnautConcept', ["CONFIG", function(CONFIG) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/home/views/home.knaut.concept.view.html'
        };
    }])

    .directive('homeFooter', ["CONFIG", function(CONFIG) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/home/views/common/home.common.footer.view.html'
        };
    }])

    ;

    