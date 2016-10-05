angular.module('app')

    .directive('dashboard',["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {            
            template: '<div class="st-container">\
                            <dashboard-navbar></dashboard-navbar>\
                            <dashboard-sidebar></dashboard-sidebar>\
                            <dashboard-chat></dashboard-chat>\
                            <div class="st-pusher" id="content">\
                                <div ui-view class="ui-view-main" />\
                            </div>\
                        </div>',                        
            controller: ['$scope', '$rootScope', '$cookieStore', '$location', function($scope, $rootScope, $cookieStore, $location){
                $scope.app.settings.htmlClass = 'st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l2';
                if($cookieStore.get('userId') && $cookieStore.get('passKey')){                        
                    $rootScope.userId = $cookieStore.get('userId');
                    $rootScope.userId = $cookieStore.get('passKey');
                    $rootScope.firstName = $cookieStore.get('firstName');
                    $rootScope.lastName = $cookieStore.get('lastName');    
                }else{
                    $location.path('/');
                }
            }]
        };
    }])

    .directive('dashboardNavbar',["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/common/dashboard.common.navbar.view.html',
            controller: ['$scope', '$rootScope', '$cookieStore', '$location', function($scope, $rootScope, $cookieStore, $location){
                $scope.logOut = function(){
                    $cookieStore.remove('userId');
                    $cookieStore.remove('passKey');
                    $cookieStore.remove('firstName');
                    $cookieStore.remove('lastName');
                    $location.path('/');
                }
            }]
        };
    }])
    .directive('dashboardSidebar', ["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/common/dashboard.common.sidebar.view.html'
        };
	}])

    .directive('followingSidebar', ["CONFIG", '$rootScope', 'ajaxService', function(CONFIG, $rootScope, ajaxService) {
        return {
            template: '<ul class="sidebar-menu">\
                            <li class="hasSubmenu"> \
                                <a data-toggle="collapse" href="#following"> \
                                    <i class="fa fa-users" aria-hidden="true"></i> \
                                <span>Following{{f.followingUser}}</span></a>\
                                <ul ng-if="f.followingUser.length>0" class="panel-collapse collapse" id="following">\
                                  <li ng-repeat="u in f.followingUser"><a href="#"><i class="fa fa-circle-o"></i> <span>Saswata</span></a></li>\
                                  <li class="no_user"><a ng-href="{{baseUrl}}dashboard/following">More</a></li>\
                                </ul>\
                                <ul ng-if="!f.followingUser" class="panel-collapse collapse" id="following">\
                                  <li class="no_user">No following user</li>\
                                  <li class="no_user"><a ng-href="{{baseUrl}}dashboard/following">More</a></li>\
                                </ul>\
                          </li>\
                        </ul>',
            controllerAs : 'f',
            controller: function($scope, $cookieStore, $location){
                f = this;
                f.followingUser = [];
                var param = {'user_id' : $cookieStore.get('userId'), 'passkey' : $cookieStore.get('passKey'), 'member_id' : $cookieStore.get('userId'), 'page': 1 , 'page_size': 5};
                ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'profiles/getFollowingConnection.json', function(result){
                    if(result){
                        if (result.response.status.action_status == 'true') {
                            f.followingUser = result.response.dataset.following_list;
                        } else {
                            f.followingUser = [];
                        }
                        
                    }
                    
                }); 
            }
        };
    }])

    .directive('followerSidebar', ["CONFIG", '$rootScope', 'ajaxService', function(CONFIG, $rootScope, ajaxService) {
        return {
            template: '<ul class="sidebar-menu">\
                            <li class="hasSubmenu">\
                            <a data-toggle="collapse" href="#followers">\
                                <i class="fa fa-users" aria-hidden="true"></i>\
                                    <span>Followers</span></a>\
                                <ul ng-if="f.followingUser.length>0" class="panel-collapse collapse" id="followers">\
                                    <li ng-repeat="fu in f.followingUser"><a href="#"><i class="fa fa-circle-o"></i> <span>Saswata</span></a></li>\
                                  <li class="no_user"><a ng-href="{{baseUrl}}dashboard/followers">More</a></li>\
                                </ul>\
                                <ul ng-if="!f.followingUser" class="panel-collapse collapse" id="followers">\
                                    <li class="no_user">No followers</li>\
                                    <li class="no_user"><a ng-href="{{baseUrl}}dashboard/followers">More</a></li>\
                                </ul>\
                          </li>\
                        </ul>',
            controllerAs : 'f',
            controller: function($scope, $cookieStore, $location){
                f = this;
                var param = {'user_id' : $cookieStore.get('userId'), 'passkey' : $cookieStore.get('passKey'), 'member_id' : $cookieStore.get('userId'), 'page': 1 , 'page_size': 5};
                ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'profiles/getFollowerConnection.json', function(result){
                    if(result){
                        if (result.response.status.action_status == 'true') {
                            f.followingUser = result.response.dataset.following_list;
                        } else {
                            f.followingUser = '';
                        }
                        
                    }
                    
                }); 
            }
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