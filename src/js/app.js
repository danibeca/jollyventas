angular.module('JollyVentasApp', [
  'ngRoute',
  'ngCookies',
  'mobile-angular-ui',
  'JollyVentasApp.controllers.Main',
  'JollyVentasApp.controllers.Login',
  'JollyVentasApp.controllers.Tienda',
  'JollyVentasApp.controllers.Compra',
  'JollyVentasApp.controllers.Venta',
  'JollyVentasApp.services.Login',
])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
        .when('/', {
            redirectTo: '/venta'
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'login.html'
        })
        .when('/tienda-seleccionar', {
            controller: 'TiendaSeleccionarController',
            templateUrl: 'tienda-seleccionar.html'
        })
        .when('/tienda-abrir', {
            controller: 'TiendaAbrirController',
            templateUrl: 'tienda-abrir.html'
        })
        .when('/tienda-cerrar', {
            controller: 'TiendaCerrarController',
            templateUrl: 'tienda-cerrar.html'
        })
        .when('/venta', {
            controller: 'VentaController',
            templateUrl: 'venta.html'
        })
        .when('/solicitud', {
            controller: 'CompraSolicitudController',
            templateUrl: 'solicitud.html'
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


