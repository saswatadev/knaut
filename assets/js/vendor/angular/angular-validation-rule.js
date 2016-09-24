(function() {
  angular
    .module('validation.rule', ['validation'])
    .config(['$validationProvider', function($validationProvider) {
      $validationProvider.validCallback = function(element) {
            element.parents('.validator-container:first').removeClass('has-error').addClass('has-success-tick');
      };
      $validationProvider.invalidCallback = function(element) {
          element.parents('.validator-container:first').removeClass('has-success-tick').addClass('has-error');
      };
      $validationProvider.resetCallback = function(element) {
          element.parents('.validator-container:first').removeClass('has-error');
      };
      var expression = {
        required: function(value) {
          return !!value;
        },
        url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
        email: /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
        number: /^\d+$/,
        minlength: function(value, scope, element, attrs, param) {
          return value.length >= param;
        },
        maxlength: function(value, scope, element, attrs, param) {
          return value.length <= param;
        }
      };

      var defaultMsg = {
        required: {
          error: 'This field is required',
          success: '' //It\'s Required
        },
        url: {
          error: 'This should be a valid Url',
          success: 'Valid Url'
        },
        email: {
          error: 'This should be a valid Email',
          success: 'Valid Email'
        },
        number: {
          error: 'This should be Number',
          success: 'Valid Number'
        },
        minlength: {
          error: 'This should be longer',
          success: ''//Long enough!
        },
        maxlength: {
          error: 'This should be shorter',
          success: ''//Short enough!
        }
      };
      $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
    }]);
}).call(this);
