angular.module('app')

    .directive('userRegistration',["CONFIG", 'ajaxService', '$timeout', '$rootScope', '$validation', function(CONFIG, ajaxService, $timeout, $rootScope, $validationProvider) {
        return {
            templateUrl: CONFIG.baseUrl+'/app/components/user/views/user.register.view.html',
            controller: function($scope){
            	$('.f1 fieldset:first').fadeIn('slow');

            	function bar_progress(progress_line_object, direction) {
					var number_of_steps = progress_line_object.data('number-of-steps');
					var now_value = progress_line_object.data('now-value');
					var new_value = 0;
					if(direction == 'right') {
						new_value = now_value + ( 100 / number_of_steps );
					}
					else if(direction == 'left') {
						new_value = now_value - ( 100 / number_of_steps );
					}
					progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
				}

				function currentButtonHit(currentButton){					
			    	var parent_fieldset = currentButton.parents('fieldset');
			    	var next_step = true;
			    	// navigation steps / progress steps
			    	var current_active_step = currentButton.parents('.f1').find('.f1-step.active');
			    	var progress_line = currentButton.parents('.f1').find('.f1-progress-line');
			    	
		    		parent_fieldset.fadeOut(400, function() {
		    			// change icons
		    			current_active_step.removeClass('active').addClass('activated').next().addClass('active');
		    			// progress bar
		    			bar_progress(progress_line, 'right');
		    			// show next step
			    		parent_fieldset.next().fadeIn();
			    	})
				}  

            	ur = this;
            	//ck editor option passed here
            	ur.ckeditorOption = {
					language: 'en',
					allowedContent: true,
					entities: false
				};

				//valid username check
				$scope.$watch('ur.registration.username', function(tmpStr) {
				    if (angular.isUndefined(tmpStr)){		    	
				        return false;
				    }else if(tmpStr==''){
				    	return false;
				    }else{
				    	$timeout(function() {
					        if (tmpStr === ur.registration.username) {
					        	var param = {'username' : ur.registration.username};
					        	ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'members/usernameAvailable.json', function(result){
									if(result){
										if (result.response.status.action_status == 'true') {
											ur.registration.usernameAlreadyExist = '';
										} else {
											ur.registration.usernameAlreadyExist = result.response.status.msg;
											return false;
										}
										
									}
									
								});	
					        }
					    }, 1000);	
				    }
				    
				})

				//valid username check
				$scope.$watch('ur.registration.email', function(tmpStr) {
				    if (angular.isUndefined(tmpStr)){		    	
				        return false;
				    }else if(tmpStr==''){
				    	return false;
				    }else{
				    	$timeout(function() {
					        if (tmpStr === ur.registration.email) {
					        	var param = {'email' : ur.registration.email};
					        	ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'members/checkemailid.json', function(result){
									if(result){
										if (result.response.status.action_status == 'true') {
											ur.registration.emailAlreadyExist = '';
										} else {
											ur.registration.emailAlreadyExist = result.response.status.msg;
											return false;
										}
										
									}
									
								});	
					        }
					    }, 1000);	
				    }
				    
				})

            	ur.registration = {
					checkValid: $validationProvider.checkValid,
					aboutSubmit: function(form, curBut) {
						if(!ur.registration.usernameAlreadyExist && !ur.registration.emailAlreadyExist && ur.registration.confirm_password==ur.registration.password){
							var param = {
								'first_name' : ur.registration.first_name,
								'last_name' : ur.registration.last_name,
								'email' : ur.registration.email,
								'username' : ur.registration.username,
								'password' : ur.registration.password,
							};
							ajaxService.AjaxPhpPost(param, CONFIG.ApiUrl+'members/signup.json', function(result){
								if(result){
									if (result.response.status.action_status == 'true') {
										var currentButton = $(curBut);
										currentButtonHit(currentButton);
										$rootScope.userId = result.response.dataset.user_id;
									} else {
										return false;
									}
									
								}
								
							});	
						}
			    		
					},
					reset: function(form) {
						$validationProvider.reset(form);
					}
			    };
            },
            controllerAs: 'ur'
        };
    }])