angular.module('app')

    .directive('dashboardNavbar',["CONFIG", function(CONFIG) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/common/dashboard.common.navbar.view.html'
        };
    }])
    .directive('dashboardSidebar', ["CONFIG", function(CONFIG) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/common/dashboard.common.sidebar.view.html'
        };
	}])
    .directive('dashboardSubNavbar',["CONFIG", function(CONFIG) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/common/dashboard.common.subnavbar.view.html'
        };
    }])
    .directive('dashboardFeed', ["CONFIG", function(CONFIG) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/common/dashboard.common.feed.view.html'
        };
    }])

    .directive('dashboardChat', ["CONFIG", function(CONFIG) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/common/dashboard.common.chat.view.html'
        };
    }])

    .directive('profileSubNavbar', ["CONFIG", function(CONFIG) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/common/profile.common.subnavbar.view.html'
        };
    }])



    ;