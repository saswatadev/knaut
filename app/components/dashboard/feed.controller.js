(function () {
    'use strict';

    angular.module('app')
        .controller('feedController', feedController);

    feedController.$inject = ["$rootScope", "$timeout", "$cookieStore", "$scope", "ajaxService"];

    function feedController($rootScope, $timeout, $cookieStore, $scope, ajaxService) {
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
})();