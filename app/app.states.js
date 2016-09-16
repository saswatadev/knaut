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
            .otherwise('/dashboard/knautboard');

        $locationProvider.html5Mode(true);
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/components/home/views/home.view.html',
                controller: "homeController",
                controllerAs: 'ctrl'
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
                templateUrl: 'app/components/user/views/user.login.view.html'
            })

            .state('register', {
                parent : 'user',
                //user/register
                url: '/register',
                templateUrl: 'app/components/user/views/user.register.view.html'
            })

            //dashboard module start here
            .state('dashboard', {
                abstract : true,
                url: '/dashboard',
                templateUrl: 'app/components/dashboard/views/dashboard.view.html',                        
                controller: ['$scope', function($scope){
                    $scope.app.settings.htmlClass = 'st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l2';
                }]
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
                url: '/delivein',
                templateUrl: 'app/components/dashboard/views/dashboard.delvein.view.html'
            })

            .state('profile', {
                parent : 'dashboard',
                //dashboard/profile
                url: '/profile',
                templateUrl: 'app/components/dashboard/views/dashboard.profile.view.html'
            })
            
        }
    ]
);
