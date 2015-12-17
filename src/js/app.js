'use strict';

angular.module('jollyVentasApp', [
  'ngRoute',
  'ngCookies',
  'mobile-angular-ui',

  'generalModule',
  'loginModule',
  'jollyVentasApp.tienda',
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
            controller: 'Tiendas',
            templateUrl: 'tienda/seleccionar.html',
            controllerAs: 'vm',
            reloadOnSearch: false,
            resolve: {
                tiendaPrepService: tiendaPrepService
            }
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
.run(['$rootScope', '$location', '$cookieStore', '$http', 'StorageService',
    function ($rootScope, $location, $cookieStore, $http, StorageService) {
        $rootScope.globals = $cookieStore.get('user') || {};        
        
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            $rootScope.showSideBar = true;
            
            var user = JSON.parse(StorageService.obtenerVariableLocalStorage('user'));
            if ($location.path() !== '/login' && !user) {
                $location.path('/login');
            }

            var tienda = JSON.parse(StorageService.obtenerVariableLocalStorage('tienda'));
            if (!tienda || !tienda.abierto){
                $rootScope.showSideBar = false;
            }

            // TODO: Evitar que llegue por navegador a las rutas 
            // - /login
            // - /tienda-seleccionar
            // - /tienda-abrir
            
        });
    }]);

/* @ngInject */
function tiendaPrepService(tiendaService) {
    return tiendaService.getList();
}

