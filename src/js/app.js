'use strict';

angular.module('jollyVentasApp', [
  'ngRoute',
  'ngCookies',
  'mobile-angular-ui',
  'generalModule',
  'loginModule',
  'tiendaModule',
  'compraModule',
  'ventaModule',  
])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
        .when('/', {
            redirectTo: '/venta',
            reloadOnSearch: false
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'login/login.html',
            reloadOnSearch: false
        })
        .when('/tienda-seleccionar', {
            controller: 'TiendaSeleccionarController',
            templateUrl: 'tienda/seleccionar.html',
            reloadOnSearch: false
        })
        .when('/tienda-abrir', {
            controller: 'TiendaAbrirController',
            templateUrl: 'tienda/abrir.html',
            reloadOnSearch: false
        })
        .when('/tienda-cerrar', {
            controller: 'TiendaCerrarController',
            templateUrl: 'tienda/cerrar.html',
            reloadOnSearch: false
        })
        .when('/venta', {
            controller: 'VentaController',
            templateUrl: 'venta/venta.html',
            reloadOnSearch: false
        })
        .when('/solicitud', {
            controller: 'CompraSolicitudController',
            templateUrl: 'solicitud/solicitud.html',
            reloadOnSearch: false
        })
        .otherwise({ redirectTo: '/login' });        
}])
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        $rootScope.globals = $cookieStore.get('globals') || {};        
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {            
            if ($location.path() !== '/login' && !$rootScope.user) {
                $location.path('/login');                
            }
            if ($location.path() == '/login'){
                $rootScope.showSideBar = false;
            }
        });
    }]);


