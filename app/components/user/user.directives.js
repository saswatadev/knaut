angular.module('app')

    .directive('userRegistration',["CONFIG", '$rootScope', '$validation', function(CONFIG, $rootScope, $validationProvider) {
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
            	ur.registration = {
					checkValid: $validationProvider.checkValid,
					aboutSubmit: function(form, curBut) {
						var currentButton = $(curBut);
						currentButtonHit(currentButton);
			    		
					},
					reset: function(form) {
						$validationProvider.reset(form);
					}
			    };
            },
            controllerAs: 'ur'
        };
    }])