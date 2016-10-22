angular.module('app')

    .directive('userRegistration',["CONFIG", 'ajaxService', '$location', '$timeout', '$rootScope', '$validation', function(CONFIG, ajaxService, $location, $timeout, $rootScope, $validationProvider) {
        return {
            template: '<div class="top-content">\
            				<div class="container">\
            					<ui-view></ui-view>\
        					</div>\
    					</div>'
        };
    }])

	.directive('userRegistrationStep1',["CONFIG", 'ajaxService', '$location', '$cookieStore', '$timeout', '$rootScope', '$validation', function(CONFIG, ajaxService, $location, $cookieStore, $timeout, $rootScope, $validationProvider) {
        return {
        	templateUrl: CONFIG.baseUrl+'/app/components/user/views/registration/user.registration.step1.view.html',
            controllerAs: 'ur1',
            controller: function($scope, $cookieStore){        
            	ur1 = this;
            	ur1.registration = {
					checkValid: $validationProvider.checkValid,
					aboutSubmit: function(form, curBut) {
						if(ur1.registration.usernameAlreadyExist=='' && ur1.registration.emailAlreadyExist=='' && ur1.registration.confirm_password==ur1.registration.password){
							var param = {
								'first_name' : ur1.registration.first_name,
								'last_name' : ur1.registration.last_name,
								'email' : ur1.registration.email,
								'username' : ur1.registration.username,
								'password' : ur1.registration.password,
							};
							ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'members/signup.json', function(result){
								if(result){
									if (result.response.status.action_status == 'true') {
										$rootScope.userId = result.response.dataset.user_id;
										$rootScope.userName = result.response.dataset.username;
										$cookieStore.put('userId',  result.response.dataset.user_id);
										$cookieStore.put('userName', result.response.dataset.username);
										$location.path('user/registration/step2');
									} else {
										return false;
									}
									
								}
								
							});	
						}else{
							return false;	
						}
			    		
					},
					reset: function(form) {
						$validationProvider.reset(form);
					}
			    };    	

            	//valid username check
				$scope.$watch('ur1.registration.username', function(tmpStr) {
				    if (angular.isUndefined(tmpStr)){		    	
				        return false;
				    }else if(tmpStr==''){
				    	return false;
				    }else{
				    	$timeout(function() {
					        if (tmpStr === ur1.registration.username) {
					        	var param = {'username' : ur1.registration.username};
					        	ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'members/usernameAvailable.json', function(result){
									if(result){
										if (result.response.status.action_status == 'true') {
											ur1.registration.usernameAlreadyExist = '';
										} else {
											ur1.registration.usernameAlreadyExist = result.response.status.msg;
											return false;
										}
										
									}
									
								});	
					        }
					    }, 1000);	
				    }
				    
				})

				//valid username check
				$scope.$watch('ur1.registration.email', function(tmpStr) {
				    if (angular.isUndefined(tmpStr)){		    	
				        return false;
				    }else if(tmpStr==''){
				    	return false;
				    }else{
				    	$timeout(function() {
					        if (tmpStr === ur1.registration.email) {
					        	var param = {'email' : ur1.registration.email};
					        	ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'members/checkemailid.json', function(result){
									if(result){
										if (result.response.status.action_status == 'true') {
											ur1.registration.emailAlreadyExist = '';
										} else {
											ur1.registration.emailAlreadyExist = result.response.status.msg;
											return false;
										}
										
									}
									
								});	
					        }
					    }, 1000);	
				    }
				    
				})
            }
        }
    }])

	.directive('userRegistrationStep2',["CONFIG", 'ajaxService', '$location', '$cookieStore', '$timeout', '$rootScope', '$validation', function(CONFIG, ajaxService, $location, $cookieStore, $timeout, $rootScope, $validationProvider) {
	    return {
	    	templateUrl: CONFIG.baseUrl+'/app/components/user/views/registration/user.registration.step2.view.html',
	        controllerAs: 'ur2',
	        controller: function($scope, $cookieStore){
	        	ur2 = this;
            	//ck editor option passed here
            	ur2.ckeditorOption = {
					language: 'en',
					allowedContent: true,
					entities: false
				};

				ur2.registration = {
					checkValid: $validationProvider.checkValid,
					step2Submit: function(){
						$location.path('user/registration/step3');
					}
				}

	        	if($cookieStore.get('userId') && $cookieStore.get('userName')){
					$rootScope.userId = $cookieStore.get('userId');
					$rootScope.userName = $cookieStore.get('userName');
				}else{
					$location.path('user/registration/step1');
				}

				if($rootScope.userId && $rootScope.userName){					
		        	ajaxService.AjaxPhpPost({}, CONFIG.ApiUrl+'members/fetchCategory.json', function(result){
						if(result){
							if (result.response.status.action_status == 'true') {
								$scope.optionsList = [{"id":4,"cat_name":"Photography"},{"id":1,"cat_name":"Painting"}]
								//console.log(result.response.dataset.cat_name[0].tbl_categories.id);
								//$scope.optionsList = result.response.dataset.cat_name;
							} else {
								return false;
							}
							
						}
						
					});
				} 	
	        }
	    }
	}])

	.directive('userRegistrationStep3',["CONFIG", 'ajaxService', '$timeout', '$rootScope', '$validation', function(CONFIG, ajaxService, $timeout, $rootScope, $validationProvider) {
	    return {
	    	templateUrl: CONFIG.baseUrl+'/app/components/user/views/registration/user.registration.step3.view.html',
	        controllerAs: 'ur3',	        
	        controller: function($scope, $cookieStore, $location){
	        	ur3 = this;        	
				ur3.registration = {
					checkValid: $validationProvider.checkValid,
					step3Submit: function(){
						var param = {'user_id' : $rootScope.userId, 'emails' : ur3.registration.email};
			        	ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'members/inviteUsers.json', function(result){
							if(result){
								if (result.response.status.action_status == 'true') {
									$location.path('user/registration/step4');
								} else {
									return false;
								}
								
							}
							
						});	
					}
				}
	        	if($cookieStore.get('userId') && $cookieStore.get('userName')){
					$rootScope.userId = $cookieStore.get('userId');
					$rootScope.userName = $cookieStore.get('userName');
				}else{
					$location.path('user/registration/step1');
				}
	        }
	    }
	}])

	.directive('userRegistrationStep4',["CONFIG", 'ajaxService', '$timeout', '$rootScope', '$validation', function(CONFIG, ajaxService, $timeout, $rootScope, $validationProvider) {
	    return {
	    	templateUrl: CONFIG.baseUrl+'/app/components/user/views/registration/user.registration.step4.view.html',
	        controllerAs: 'ur4',	        
	        controller: function($scope, $cookieStore, $location){
	        	if($cookieStore.get('userId') && $cookieStore.get('userName')){
					$rootScope.userId = $cookieStore.get('userId');
					$rootScope.userName = $cookieStore.get('userName');
				}else{
					$location.path('user/registration/step1');
				}

				ur4 = this;        	
				ur4.registration = {
					checkValid: $validationProvider.checkValid,
					step4Submit: function(){
						$location.path('user/login');
					}
				}
	        }
	    }
	}])

	.directive('userLogin',["CONFIG", 'ajaxService', '$timeout', '$rootScope', '$validation', function(CONFIG, ajaxService, $timeout, $rootScope, $validationProvider) {
	    return {
	    	templateUrl: CONFIG.baseUrl+'/app/components/user/views/user.login.view.html',
	        controllerAs: 'l',	        
	        controller: function($scope, $cookieStore, $location){
	        	if($cookieStore.get('userId') && $cookieStore.get('passKey')){			
					$location.path('dashboard/knautboard');
				}

				l = this;        	
				l.login = {
					checkValid: $validationProvider.checkValid,
					submit: function(){
						var param = {'username' : l.login.email , 'user_pwd' : l.login.password, 'session_id' : 123456, 'timezone' : 'Asia/Kolkata'};
			        	ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'members/login.json', function(result){
							if(result){
								if (result.response.status.action_status == 'true') {
									$rootScope.userId = result.response.dataset.user_id;
									$rootScope.userName = result.response.dataset.username;
									$cookieStore.put('userId',  result.response.dataset.user_id);
									$cookieStore.put('userName', result.response.dataset.username);
									$cookieStore.put('passKey', result.response.dataset.pass_key);
									$cookieStore.put('firstName', result.response.dataset.first_name);
									$cookieStore.put('lastName', result.response.dataset.last_name);
									$location.path('dashboard/knautboard');
								} else {
									l.errorMessage = result.response.status.msg;
									$timeout(function(){
										l.errorMessage = '';
									},5000)
									
								}
								
							}
							
						});	
					}
				}
	        }
	    }
	}])

	.directive('userForgetPassword',["CONFIG", 'ajaxService', '$timeout', '$rootScope', '$validation', function(CONFIG, ajaxService, $timeout, $rootScope, $validationProvider) {
	    return {
	    	templateUrl: CONFIG.baseUrl+'/app/components/user/views/user.forget.password.view.html',
	        controllerAs: 'f',	        
	        controller: function($scope, $cookieStore, $location){	        	
	        	if($cookieStore.get('userId') && $cookieStore.get('passKey')){		
					$location.path('dashboard/knautboard');
				}

				f = this;        	
				f.forget = {
					checkValid: $validationProvider.checkValid,
					submit: function(){
						var param = {'username' : f.forget.username};
			        	ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'members/forgetpasswordStep1.json', function(result){
							if(result){
								if (result.response.status.action_status == 'true') {
									f.succesMessage = 'A mail has been sent to your mail,please click the link and change your password.';
									$timeout(function(){
										f.succesMessage = '';
									},7000);
								} else {
									f.errorMessage = result.response.status.msg;
									$timeout(function(){
										f.errorMessage = '';
									},5000);
									
								}
								
							}
							
						});	
					}
				}
	        }
	    }
	}])

	.directive('userVerificationCode',["CONFIG", 'ajaxService', '$timeout', '$rootScope', '$validation', function(CONFIG, ajaxService, $timeout, $rootScope, $validationProvider) {
	    return {
    		templateUrl: CONFIG.baseUrl+'/app/components/user/views/user.verification.code.view.html',
	        controllerAs: 'v',	        
	        controller: function($scope, $cookieStore, $location, $stateParams){	        	
	        	if($cookieStore.get('userId') && $cookieStore.get('passKey')){			
					$location.path('dashboard/knautboard');
				}

				v = this;        	
				var param = {'verification_code' : $stateParams.verification_code};
	        	ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'members/forgetpasswordStep2.json', function(result){
					if(result){
						if (result.response.status.action_status == 'true') {
							v.succesMessage = 'Valid code.redirecting..';
							$cookieStore.put('changePasswordUserId', result.response.dataset.user_id);
							$timeout(function(){
								$location.path('user/reset_password');
							},2000);
						} else {
							v.errorMessage = 'This link has been expired.';							
						}
						
					}
					
				});	
	        }
	    }
	}])

	.directive('userResetPassword',["CONFIG", 'ajaxService', '$timeout', '$rootScope', '$validation', function(CONFIG, ajaxService, $timeout, $rootScope, $validationProvider) {
	    return {
    		templateUrl: CONFIG.baseUrl+'/app/components/user/views/user.reset.password.view.html',
	        controllerAs: 'r',	        
	        controller: function($scope, $cookieStore, $location, $stateParams){	        	
	        	if($cookieStore.get('userId') && $cookieStore.get('passKey')){			
					$location.path('dashboard/knautboard');
				}
        	
				r = this;        	
				r.reset = {
					checkValid: $validationProvider.checkValid,
					submit: function(){
						if(r.reset.password == r.reset.confirm_password){
							var param = {'user_id' : $cookieStore.get('changePasswordUserId'), 'password' : r.reset.password};
				        	ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'members/forgetpasswordStep3.json', function(result){
								if(result){
									if (result.response.status.action_status == 'true') {
										r.succesMessage = 'You reset your password successfully.You are redirecting to login page...';
										$timeout(function(){
											$cookieStore.remove('changePasswordUserId');
											r.succesMessage = '';
											$location.path('user/login');
										},7000);
									} else {
										r.errorMessage = result.response.status.msg;
										$timeout(function(){
											r.errorMessage = '';
										},5000);
										
									}
									
								}
								
							});		
						}else{
							r.errorMessage = 'Password and confirm password did not match.';
							$timeout(function(){
								r.errorMessage = '';
							},5000);
						}
					}
				}
	        }
	    }
	}])