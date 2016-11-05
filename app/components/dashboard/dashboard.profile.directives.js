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
                        //console.log(result);
                        if (result.response.status.action_status == 'true') {
                            p.profileDetails = result.response.dataset;                            
                            $(function() {
                              $(".coverphoto").CoverPhoto({
                                currentImage: p.profileDetails.cover_img,
                                editable: true,
                                height:300,
                                width : 1150
                              });
                              $(".coverphoto").bind('coverPhotoUpdated', function(evt, dataUrl) {
                                console.log(dataUrl);
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

                        } else {
                            p.profileDetails = '';
                        }
                        
                    }                    
                }); 
            }
        };
    }])
    
    .directive('dashboardProfileEdit', ["CONFIG", '$rootScope', '$validation', function(CONFIG, $rootScope, $validationProvider) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/profile/dashboard.profile.edit.view.html',
            controllerAs : 'e',
            controller: function(ajaxService, $scope, $cookieStore, $location){
                e = this;
                e.profileDetails = {};
                var param = {'member_id' : $cookieStore.get('userId'),'user_id' : $cookieStore.get('userId'), 'passkey' : $cookieStore.get('passKey'), 'member_id' : $cookieStore.get('userId'), 'page': 1 , 'page_size': 5};
                ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'profiles/details.json', function(result){
                    if(result){
                        if (result.response.status.action_status == 'true') {
                            e.profileDetails = result.response.dataset.details.User;
                            e.profileDetails.checkValid = $validationProvider.checkValid;

                        }
                    }
                })

                e.editSubmit = function(){
                    e.profileDetails.member_id = $cookieStore.get('userId');
                    e.profileDetails.user_id = $cookieStore.get('userId');
                    e.profileDetails.passkey = $cookieStore.get('passKey');
                    var param = e.profileDetails;
                    ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'profiles/editProfile.json', function(result){
                        if(result){
                            if (result.response.status.action_status == 'true') {
                                ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'profiles/details.json', function(result){
                                    if(result){
                                        if (result.response.status.action_status == 'true') {
                                            $rootScope.profileDetails = result.response.dataset;
                                        }
                                    }
                                })
                            } else {
                                return false;
                            }
                            
                        }
                        
                    }); 
                }
            }
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
