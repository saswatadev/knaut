angular.module('app')

    .directive('dynamicUrl', function () {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attr) {
                element.attr('src', attr.dynamicUrlSrc);
            }
        };
    })

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
                    $rootScope.passKey = $cookieStore.get('passKey');
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
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/common/dashboard.common.sidebar.view.html',
            controllerAs : 's',
            controller: function(ajaxService, $scope, $cookieStore, $location, $rootScope){
                s = this;
                var param = {'member_id' : $cookieStore.get('userId'),'user_id' : $cookieStore.get('userId'), 'passkey' : $cookieStore.get('passKey'), 'member_id' : $cookieStore.get('userId'), 'page': 1 , 'page_size': 5};
                ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'profiles/details.json', function(result){
                    if(result){
                        if (result.response.status.action_status == 'true') {
                            s.profileDetails = result.response.dataset;
                            $rootScope.profileDetails = result.response.dataset;
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

    .directive('dashboardKnautboard',["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'app/components/dashboard/views/dashboard.knautboard.view.html',
            controllerAs: 'k',
            controller: function(ajaxService, CONFIG, $scope, $cookieStore, $location){
                k = this;
                var param = {
                            'user_id' : $cookieStore.get('userId'), 
                            'passkey' : $cookieStore.get('passKey'),
                            'member_id' : $cookieStore.get('userId')
                        };

                ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'profiles/getallProfileFeed.json', function(result){
                    if(result){
                        if (result.response.status.action_status == 'true') {
                            k.knautFeed = result.response.dataset;
                        } else {
                            return false;
                        }
                        
                    }
                    
                });
            }
        };
    }])

    .directive('dashboardSubNavbar',["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'app/components/dashboard/views/common/dashboard.common.subnavbar.view.html'
        };
    }])
    .directive('dashboardSubNavbarUpperSection',["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/common/dashboard.common.subnavbar.uppersection.view.html'
        };
    }])

    .directive('dashboardFeed', ["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/common/dashboard.common.feed.view.html',
            scope: {
                feed: '=',
            },
            link: function (scope, element, attrs) {
            }        
        };
    }])

    .directive('dashboardChat', ["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/common/dashboard.common.chat.view.html'
        };
    }])
    
    .directive('dashboardPost', ["CONFIG", '$rootScope', '$validation', function(CONFIG, $rootScope, $validationProvider) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/dashboard/views/dashboard.post.view.html',
            controllerAs: 'ur2',
            controller: function(ajaxService, CONFIG, $scope, $cookieStore, $location){
                ur2 = this;
                $scope.postFileUplaod = function(event){
                    var input = event.target;
                    console.log(input);
                    var reader = new FileReader();
                    reader.onload = function(){
                        var dataURL = reader.result;
                        console.log(dataURL);
                    }
                }
                $(document).on('change', '#postfileupload', function(){
                    ur2.registration.postFile = this.files[0];
                })
                ur2.registration = {
                    checkValid: $validationProvider.checkValid,
                    step2Submit: function(){
                        //console.log(ur2.registration);
                        //if(ur2.registration.content_type=='B'){
                        var category = ur2.registration .category.length > 0 ? ur2.registration.category.join() : '';
                        var param = {
                            'user_id' : $cookieStore.get('userId'), 
                            'passkey' : $cookieStore.get('passKey'),
                            'content_type' : ur2.registration.content_type, 
                            'cat_name' : '', 
                            'cat_id' : category, 
                            'title' : ur2.registration.content_title,
                            'description' : ur2.registration.content,
                        };

                        ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'profiles/addPost.json', function(result){
                            if(result){
                                if (result.response.status.action_status == 'true') {
                                    if(ur2.registration.content_type=='B'){
                                        $location.path('dashboard/knautboard');
                                    }else{
                                        var postId = result.response.dataset.TblPostsComment.id; 
                                        ur2.registration.postFile
                                        var formData = new FormData();

                                        formData.append("user_id", $cookieStore.get('userId'));
                                        formData.append("passkey", $cookieStore.get('passKey'));
                                        formData.append("post_id", postId); 
                                        formData.append("content_type", ur2.registration.content_type);
                                        formData.append("content_type_details", ur2.registration.postFile);                                        
                                        //console.log(formData);
                                        ajaxService.AjaxPhpPostFile(formData, CONFIG.ApiUrl+'profiles/addPostFile.json', function(result){
                                            if(result){
                                                if (result.response.status.action_status == 'true') {
                                                    $location.path('dashboard/knautboard');
                                                } else {
                                                    return false;
                                                }
                                                
                                            }
                                            
                                        });
                                    }
                                } else {
                                    return false;
                                }
                                
                            }
                            
                        });
                    }
                }
                ur2.optionsList = [];
                ajaxService.AjaxPhpPost({}, CONFIG.ApiUrl+'members/fetchCategory.json', function(result){
                    if(result){
                        if (result.response.status.action_status == 'true') {
                            ur2.optionsList = result.response.dataset.cat_name;
                            //ur2.optionsList = [{"id":4,"cat_name":"Photography"},{"id":1,"cat_name":"Painting"}]
                        } else {
                            ur2.optionsList = [{"id":4,"cat_name":"Photography"},{"id":1,"cat_name":"Painting"}];
                            return false;
                        }
                        
                    }
                    
                });
            }
        };
    }]);