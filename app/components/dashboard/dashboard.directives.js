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
                    $rootScope.passKey = $cookieStore.get('passKey');
                    $rootScope.firstName = $cookieStore.get('firstName');
                    $rootScope.lastName = $cookieStore.get('lastName');    
                }else{
                    $cookieStore.remove('userId');
                    $cookieStore.remove('passKey');
                    $cookieStore.remove('firstName');
                    $cookieStore.remove('lastName');
                    $location.path('/');
                }
            }]
        };
    }])

    .directive('dashboardNavbar',["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'app/components/dashboard/views/common/dashboard.common.navbar.view.html',
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

    .directive('dashboardSubNavbarUpperMenu',["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'app/components/dashboard/views/common/dashboard.common.subnavbar.upper.menu.view.html',
            controllerAs: 's',
            controller: function($rootScope, $timeout, $cookieStore, $scope, ajaxService){
                
            }   
        };
    }])

    .directive('dashboardSubNavbar',["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'app/components/dashboard/views/common/dashboard.common.subnavbar.view.html',
            controllerAs: 's',
            controller: function($rootScope, $timeout, $cookieStore, $scope, ajaxService){
                $rootScope.searchKeyword = '';
                s = this;
                s.searchCategoryType = '';
                s.searchSortType = '';
                s.searchPopularType = '';
                s.searchByCategory = function(type){
                    s.searchCategoryType = type;
                    s.getFilteredKnaut();
                }
                s.searchBySort = function(type){
                    s.searchSortType = type;
                    s.getFilteredKnaut();
                }
                s.searchByPopularity = function(type){
                    s.searchPopularType = type;
                    s.getFilteredKnaut();
                }

                s.getFilteredKnaut = function(){
                    var param = {
                            'user_id' : $cookieStore.get('userId'), 
                            'passkey' : $cookieStore.get('passKey'),
                            'member_id' : $cookieStore.get('userId'),
                            'category' : s.searchCategoryType,
                            'sort' : s.searchSortType,
                            'popular' : s.searchPopularType
                        };

                    ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'profiles/getKnautBoardFeeds.json', function(result){
                        if(result){
                            if (result.response.status.action_status == 'true') {
                                $rootScope.knautFeed = result.response.dataset;
                            } else {
                                return false;
                            }
                            
                        }
                        
                    });
                }
            }   
        };
    }])

    .directive('dashboardSubNavbarUpperSection',["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'app/components/dashboard/views/common/dashboard.common.subnavbar.uppersection.view.html'
        };
    }])

    .directive('dashboardFeed', ["CONFIG", 'ajaxService', '$cookieStore', '$rootScope', function(CONFIG, ajaxService, $cookieStore, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'app/components/dashboard/views/common/dashboard.common.feed.view.html',
            transclude : true,
            scope: {
                feed: '=',
            },
            controller:function($rootScope, $timeout, $cookieStore, $scope, ajaxService){

                $scope.knautList = [];
                $scope.successMessage = '';
                $scope.setupPopOver = function(){
                    $("[data-toggle=popover]").popover({
                            html: true, 
                            content: function() {
                                  return $('#popover-content').html();
                                }
                        });
                }

                $scope.openShareKnaut = function(postId){
                    $scope.postId = postId;
                }

                $(document).on('submit', 'form[name="knautShare"]', function(){
                    var knautgroupselected = [];
                    $(this).find(':checkbox:checked').each(function(i){
                      knautgroupselected[i] = $(this).val();
                    });
                    if(knautgroupselected.length>0){
                        var param = {'user_id' : $cookieStore.get('userId'), 'passkey' : $cookieStore.get('passKey'), 'member_id' : $cookieStore.get('userId'), 'group_ids': knautgroupselected.join() , 'post_id': $(this).find('input[name="postid"]').val()};
                        ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'profiles/addKnaut.json', function(result){
                            if(result){
                                if (result.response.status.action_status == 'true') {
                                } else {
                                }
                            }
                            
                        }); 
                    }
                })

                $(document).on('click', 'form[name="knautShare"] .allgroup', function(){
                    var knautgroupselected = [];
                    angular.forEach($rootScope.knautList,function(value, key){
                      knautgroupselected[key] = value.TblGroup.id;
                    })
                    if(knautgroupselected.length>0){
                        var param = {'user_id' : $cookieStore.get('userId'), 'passkey' : $cookieStore.get('passKey'), 'member_id' : $cookieStore.get('userId'), 'group_ids': knautgroupselected.join() , 'post_id': $(this).data('postId')};
                        ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'profiles/addKnaut.json', function(result){
                            if(result){
                                if (result.response.status.action_status == 'true') {
                                } else {
                                }
                            }
                            
                        }); 
                    }
                })

                $(document).on('submit', 'form[name="knautSharefriends"]', function(){
                    var knautfriendselected = [];
                    var inc = 0;
                    $(this).find(':checkbox:checked').each(function(i){
                        if($(this).val()!='on'){
                            knautfriendselected[inc] = $(this).val();
                            inc++;   
                        }
                    });
                    if(knautfriendselected.length>0){
                        var param = {'user_id' : $cookieStore.get('userId'), 'passkey' : $cookieStore.get('passKey'), 'member_id' : $cookieStore.get('userId'), 'member_ids': knautfriendselected.join() , 'post_id': $(this).find('input[name="postidFriends"]').val()};
                        ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'profiles/addKnaut.json', function(result){
                            if(result){
                                if (result.response.status.action_status == 'true') {
                                    $scope.successMessage = 'You shared successfully.';
                                    $timeout(function() {
                                        $scope.successMessage = '';
                                    }, 4000);
                                } else {
                                }
                            }
                            
                        }); 
                    }
                })
                
                $(document).on('click', '.custom-user-click', function(){
                  $("[data-toggle=popover]").popover('hide');  
                })
            }
        };
    }])

    .directive('dashboardChat', ["CONFIG", '$rootScope', function(CONFIG, $rootScope) {
        return {
            templateUrl: CONFIG.baseUrl+'app/components/dashboard/views/common/dashboard.common.chat.view.html'
        };
    }])
    
    .directive('dashboardPost', ["CONFIG", '$rootScope', '$validation', function(CONFIG, $rootScope, $validationProvider) {
        return {
            templateUrl: CONFIG.baseUrl+'app/components/dashboard/views/dashboard.post.view.html',
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