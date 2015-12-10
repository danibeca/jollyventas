angular.module('JollyVentasApp', [
  'ngRoute',
  'ngCookies',
  'mobile-angular-ui',
  'JollyVentasApp.controllers.Main',
  'JollyVentasApp.controllers.Login',
  'JollyVentasApp.services.Login',
])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'login.html'
        })
        .when('/', {
            controller: 'MainController',
            templateUrl: 'home.html'
        })  
        .otherwise({ redirectTo: '/login' });
}])
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {            
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);


