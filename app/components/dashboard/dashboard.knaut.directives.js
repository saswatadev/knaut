angular.module('app')

    .directive('dashboardKnautboard',["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'app/components/dashboard/views/knaut/dashboard.knautboard.view.html',
            controllerAs: 'k',
            controller: function(ajaxService, $rootScope, CONFIG, $scope, $cookieStore, $location){
                k = this;
                var param = {
                            'user_id' : $cookieStore.get('userId'), 
                            'passkey' : $cookieStore.get('passKey'),
                            'member_id' : $cookieStore.get('userId')
                        };

                ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'profiles/getKnautBoardFeeds.json', function(result){
                    if(result){
                        if (result.response.status.action_status == 'true') {
                            k.knautFeed = result.response.dataset;
                            $rootScope.knautFeed = k.knautFeed;
                        } else {
                            return false;
                        }
                        
                    }
                    
                });
            }
        };
    }])

    .directive('myKnautMembers',["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'app/components/dashboard/views/knaut/dashboard.my.knaut.members.view.html',
            controllerAs: 'm',
            controller: function(ajaxService, $rootScope, CONFIG, $scope, $cookieStore, $location){
                m = this;
                var param = {
                            'user_id' : $cookieStore.get('userId'), 
                            'passkey' : $cookieStore.get('passKey'),
                            'group_id' : $rootScope.knautId
                        };

                ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'groups/getAllMembers.json', function(result){
                    if(result){
                        if (result.response.status.action_status == 'true') {
                            console.log(result.response);
                        } else {
                            return false;
                        }
                        
                    }
                    
                });
            }
        };
    }])

    .directive('myKnautFeed',["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'app/components/dashboard/views/knaut/dashboard.my.knaut.feed.view.html',
            scope: {
                feed: '='
            },
            controller: 'feedController'
        };
    }])

    .directive('dashboardMyKnaut',["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'app/components/dashboard/views/knaut/dashboard.my.knaut.view.html',
            controllerAs: 'p',
            controller: function(ajaxService, $stateParams, $rootScope, CONFIG, $scope, $cookieStore, $location){
                p = this;
                p.knautId = $stateParams.knautId;
                $rootScope.knautId = $stateParams.knautId;
                var param = {'user_id' : $cookieStore.get('userId'), 'passkey' : $cookieStore.get('passKey'), 'group_id' : p.knautId};
                ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'groups/groupDtl.json', function(result){
                    if(result){
                        //console.log(result);
                        if (result.response.status.action_status == 'true') {
                            //console.log(result.response.dataset);
                            p.profileDetails = result.response.dataset;  
                            p.profileDetails.cover_img = p.profileDetails.cover_img ? p.profileDetails.cover_img : CONFIG.baseUrl+'assets/images/knaut-default_pic.jpg';                         
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

                var param = {
                            'user_id' : $cookieStore.get('userId'), 
                            'passkey' : $cookieStore.get('passKey'),
                            'group_id' : p.knautId
                        };

                ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'profiles/getGroupFeeds.json', function(result){
                    if(result){
                        if (result.response.status.action_status == 'true') {
                            $rootScope.knautFeed = result.response.dataset;
                        } else {
                            return false;
                        }
                        
                    }
                    
                });
            }
        };
    }])

    .directive('dashboardAddKnaut',["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'app/components/dashboard/views/knaut/dashboard.add.knaut.view.html',
            controllerAs : 'a',
            controller: ['$scope', '$timeout', 'ajaxService', '$rootScope', '$cookieStore', '$location', function($scope, $timeout, ajaxService, $rootScope, $cookieStore, $location){
                a = this;
                a.errorMessage = '';
                a.successMessage = '';
                var followersId = [];
                a.followersId = followersId;
                var param = {'user_id' : $cookieStore.get('userId'), 'passkey' : $cookieStore.get('passKey'), 'member_id' : $cookieStore.get('userId'), 'page': 1 , 'page_size': 100};
                ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'profiles/getFollowerConnection.json', function(result){
                    if(result){
                        if (result.response.status.action_status == 'true') {
                            a.followers = result.response.dataset.follower_list;
                            angular.forEach(a.followers, function(value, key) {
                              this.push(value.id);
                            }, followersId);
                            a.followersId = followersId;
                        } else {
                            a.followers = [];
                        }
                        
                    }
                    
                }); 
                a.knautadd = {};
                a.knautadd.friends = [];
                a.checkAllFriends = function(){
                    if(a.allFriends){
                        a.knautadd.friends = angular.copy(a.followersId);
                    }else{
                        a.knautadd.friends = [];
                    }
                }

                a.createKnaut = function() {
                    var param = {'user_id' : $cookieStore.get('userId'), 'passkey' : $cookieStore.get('passKey'), 'name' : a.knautadd.name,'description' : a.knautadd.description,  'member_ids' : a.knautadd.friends};
                    ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'groups/createKnaut.json', function(result){
                        if(result){
                            if (result.response.status.action_status == 'true') {
                                a.successMessage = 'Your knaut has been added successfully.';
                                $location.path('/dashboard/knautboard');
                                a.knautadd = {};
                                $timeout(function(){
                                    a.successMessage = '';
                                },4500);
                            } else {
                                a.errorMessage = result.response.status.msg;
                                $timeout(function(){
                                    a.errorMessage = '';
                                },4500);
                            }
                            
                        }
                        
                    }); 
                }

            }]
        };
    }])