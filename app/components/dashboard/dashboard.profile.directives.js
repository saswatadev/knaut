angular.module('app')

	.directive('dashboardProfile', ["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'app/components/dashboard/views/profile/dashboard.profile.view.html'
        };
    }])

    .directive('dashboardProfileHome', ["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/profile/dashboard.profile.home.view.html',
            controllerAs : 'p',
            controller: function(ajaxService, $scope, $cookieStore, $location){
                p = this;
                var param = {'member_id' : $cookieStore.get('userId'),'user_id' : $cookieStore.get('userId'), 'passkey' : $cookieStore.get('passKey'), 'member_id' : $cookieStore.get('userId'), 'page': 1 , 'page_size': 5};
                ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'profiles/details.json', function(result){
                    if(result){
                        if (result.response.status.action_status == 'true') {
                            p.profileDetails = result.response.dataset;
                        } else {
                            p.profileDetails = '';
                        }
                        
                    }
                    $(function() {
                      $(".coverphoto").CoverPhoto({
                        currentImage: './assets/images/profile-cover.jpg',
                        editable: true
                      });
                      $(".coverphoto").bind('coverPhotoUpdated', function(evt, dataUrl) {
                        $(".output").empty();
                        $("<img>").attr("src", dataUrl).appendTo(".output");
                        var param = {'user_id' : $cookieStore.get('userId'), 'passkey' : $cookieStore.get('passKey'), 'userfile' : dataUrl};
                        ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'profiles/addCoverPicture.json', function(result){
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
    
    .directive('dashboardProfileEdit', ["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/profile/dashboard.profile.edit.view.html'
        };
    }])

    .directive('dashboardProfileChangePassword', ["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/profile/dashboard.profile.change.password.view.html'
        };
    }])

    .directive('profileSubNavbar', ["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/profile/profile.common.subnavbar.view.html'
        };
    }])
