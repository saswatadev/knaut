angular.module('app')

   .directive('dashboardSidebar', ["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/sidebar/dashboard.sidebar.view.html',
            controllerAs : 's',
            controller: function(ajaxService, $scope, $cookieStore, $location, $rootScope){
                s = this;
                var param = {'member_id' : $cookieStore.get('userId'),'user_id' : $cookieStore.get('userId'), 'passkey' : $cookieStore.get('passKey'), 'member_id' : $cookieStore.get('userId'), 'page': 1 , 'page_size': 5};
                ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'profiles/details.json', function(result){
                    if(result){
                        if (result.response.status.action_status == 'true') {
                            s.profileDetails = result.response.dataset;
                            $rootScope.profileDetails = result.response.dataset;
                            $rootScope.profileDetails.profile_img = $rootScope.profileDetails.profile_img ? $rootScope.profileDetails.profile_img : CONFIG.baseUrl+'assets/images/no_profile_image.png';
                        } else {
                            s.profileDetails = '';
                        }
                        
                    }
                    $(function() {
                      $(".profileImage").CoverPhoto({
                        currentImage: s.profileDetails.profile_img,
                        editable: true,
                        height : 150,
                        width : 150,
                      });
                      $(".profileImage").bind('coverPhotoUpdated', function(evt, dataUrl) {
                        $(".output").empty();
                        $("<img>").attr("src", dataUrl).appendTo(".output");
                        var param = {'user_id' : $cookieStore.get('userId'), 'passkey' : $cookieStore.get('passKey'), 'userfile' : dataUrl};
                        ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'profiles/addProfilePicture.json', function(result){
                            if(result){
                                if (result.response.status.action_status == 'true') {
                                    return true;
                                } else {
                                    return false;
                                }
                                
                            }
                            
                        });

                      });
                    }); 
                    
                }); 
            }
        };
    }])

.directive('followingSidebar', ["CONFIG", '$rootScope', 'ajaxService', function(CONFIG, $rootScope, ajaxService) {
        return {
            templateUrl: CONFIG.baseUrl+'app/components/dashboard/views/sidebar/dashboard.following.sidebar.view.html',
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
            templateUrl: CONFIG.baseUrl+'app/components/dashboard/views/sidebar/dashboard.follower.sidebar.view.html',
            controllerAs : 'f',
            controller: function($scope, $cookieStore, $location){
                f = this;
                var param = {'user_id' : $cookieStore.get('userId'), 'passkey' : $cookieStore.get('passKey'), 'member_id' : $cookieStore.get('userId'), 'page': 1 , 'page_size': 5};
                ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'profiles/getFollowerConnection.json', function(result){
                    if(result){
                        if (result.response.status.action_status == 'true') {
                            f.followerList = result.response.dataset.follower_list;
                        } else {
                            f.followerList = [];
                        }
                        $rootScope.followerList = f.followerList;
                    }
                    
                }); 
            }
        };
    }])

    .directive('knautSidebar', ["CONFIG", '$rootScope', 'ajaxService', function(CONFIG, $rootScope, ajaxService) {
        return {
            templateUrl: CONFIG.baseUrl+'app/components/dashboard/views/sidebar/dashboard.knaut.sidebar.view.html',
            controllerAs : 'f',
            controller: function($scope, $cookieStore, $location){
                f = this;
                var param = {'user_id' : $cookieStore.get('userId'), 'passkey' : $cookieStore.get('passKey'), 'member_id' : $cookieStore.get('userId'), 'page': 1 , 'page_size': 5};
                ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'groups/getAllKnaut.json', function(result){
                    if(result){
                        if (result.response.status.action_status == 'true') {
                            f.knautList = result.response.dataset;
                        } else {
                            f.knautList = [];
                        }
                        
                        $rootScope.knautList = f.knautList;
                        
                    }
                    
                }); 
            }
        };
    }])