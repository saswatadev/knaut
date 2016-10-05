/**
 * Load states for application
 * more info on UI-Router states can be found at
 * https://github.com/angular-ui/ui-router/wiki
 */
angular.module('app')
    .run([ '$rootScope', '$state', '$stateParams', 'CONFIG',
        function ($rootScope, $state, $stateParams, CONFIG) {
            $rootScope.$state = $state;            
            $rootScope.$stateParams = $stateParams;
            $rootScope.baseUrl = CONFIG.baseUrl;
        }
    ])

    .config(
    [ '$stateProvider', '$urlRouterProvider', '$locationProvider', 
        function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/components/home/views/home.view.html',
                controller: function($scope){
                    $scope.app.settings.htmlClass = '';
                }
            })
            .state('404', {
                url: '/404',
                templateUrl: 'app/shared/404.html'
            })

            //user module start here
            .state('user', {
                abstract : true,
                url: '/user',
                templateUrl: 'app/components/user/views/user.view.html'
            })

            .state('login', {
                parent : 'user',
                //user/login
                url: '/login',
                template: '<user-login></user-login>'
            })

            .state('registration', {
                parent : 'user',
                //user/register
                url: '/registration',
                template: '<user-registration></user-registration>'
            })

            .state('registration.step1', {
                //user/registration/step1
                url: '/step1',
                template: '<user-registration-step1></user-registration-step1>'
            })

            .state('registration.step2', {
                //user/registration/step2
                url: '/step2',
                template: '<user-registration-step2></user-registration-step2>'
            })

            .state('registration.step3', {
                //user/registration/step3
                url: '/step3',
                template: '<user-registration-step3></user-registration-step3>'
            })

            .state('registration.step4', {
                //user/registration/step3
                url: '/step4',
                template: '<user-registration-step4></user-registration-step4>'
            })

            .state('forget_password', {
                parent : 'user',
                //user/forget_password
                url: '/forget_password',
                template: '<user-forget-password></user-forget-password>'
            })

            .state('verification_code', {
                parent : 'user',
                //user/verification_code/:verification_code
                url: '/verification_code/:verification_code',
                template: '<user-verification-code></user-verification-code>'
            })

            .state('reset_password', {
                parent : 'user',
                //user/reset_password
                url: '/reset_password',
                template: '<user-reset-password></user-reset-password>'
            })

            //dashboard module start here
            .state('dashboard', {
                abstract : true,
                url: '/dashboard',
                template:'<dashboard></dashboard>'
            })

            .state('knautboard', {
                parent : 'dashboard',
                //dashboard/knautboard
                url: '/knautboard',
                templateUrl: 'app/components/dashboard/views/dashboard.knautboard.view.html',
            })

            .state('delvein', {
                parent : 'dashboard',
                //dashboard/delvein
                url: '/delvein',
                templateUrl: 'app/components/dashboard/views/dashboard.delvein.view.html'
            })

            .state('profile', {
                parent : 'dashboard',
                //dashboard/profile
                url: '/profile',
                templateUrl: 'app/components/dashboard/views/dashboard.profile.view.html'
            })

            .state('followers', {
                parent : 'dashboard',
                //dashboard/profile
                url: '/followers',
                templateUrl: 'app/components/dashboard/views/dashboard.followers.view.html'
            })

            .state('following', {
                parent : 'dashboard',
                //dashboard/profile
                url: '/following',
                templateUrl: 'app/components/dashboard/views/dashboard.following.view.html'
            })
            
        }
    ]
);
