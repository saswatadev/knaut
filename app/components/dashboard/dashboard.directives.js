angular.module('app')

    .directive('dashboardNavbar',["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/common/dashboard.common.navbar.view.html'
        };
    }])
    .directive('dashboardSidebar', ["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/common/dashboard.common.sidebar.view.html'
        };
	}])
    .directive('dashboardSubNavbar',["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/common/dashboard.common.subnavbar.view.html'
        };
    }])
    .directive('dashboardSubNavbarUpperSection',["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/common/dashboard.common.subnavbar.uppersection.view.html'
        };
    }])
    .directive('dashboardFeed', ["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/common/dashboard.common.feed.view.html'
        };
    }])

    .directive('dashboardChat', ["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/common/dashboard.common.chat.view.html'
        };
    }])

    .directive('profileSubNavbar', ["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/common/profile.common.subnavbar.view.html'
        };
    }])


    ;