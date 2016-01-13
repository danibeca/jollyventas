'use strict';

angular.module('jollyVentasApp', [
  'ngRoute',  
  'mobile-angular-ui',

  'app.general',
  'app.usuario',
  'app.tienda',
  'app.caja',
  'app.almacen',
  'app.venta',
  'app.devolucion'
  //'compraModule',
  //'ventaModule',  
])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
        .when('/login', {
            controller: 'Login',
            controllerAs: 'vm',
            templateUrl: 'login/login.html',
            reloadOnSearch: false,
            resolve: {
                clearStorageService: clearStorageService,
                clearSessionService: clearSessionService
            }
        })
        .when('/tienda-seleccionar', {
            controller: 'TiendaSeleccion',
            controllerAs: 'vm',
            templateUrl: 'tienda/seleccionar.html',            
            reloadOnSearch: false,
            resolve: {
                tiendaPrepService: tiendaPrepService
            }
        })
        .when('/tienda-abrir', {
            controller: 'TiendaApertura',
            controllerAs: 'vm',
            templateUrl: 'tienda/abrir.html',
            reloadOnSearch: false,
            resolve: {
                cajaPrepService: cajaPrepService,
                almacenPrepService: almacenPrepService
            }
        })
        .when('/tienda-cerrar', {
            controller: 'TiendaCierre',
            controllerAs: 'vm',
            templateUrl: 'tienda/cerrar.html',
            reloadOnSearch: false
        })
        .when('/venta', {
            controller: 'Venta',
            controllerAs: 'vm',
            templateUrl: 'venta/venta.html',
            reloadOnSearch: false
        })
        .when('/devolucion', {
            controller: 'Devolucion',
            controllerAs: 'vm',
            templateUrl: 'devolucion/devolucion.html',
            reloadOnSearch: false
        })
        .otherwise({ redirectTo: '/login' });        
}])
.run(['$rootScope', '$http', 'locationService', 'usuarioService', 'tiendaService', 'storageService',
    function ($rootScope, $http, locationService, usuarioService, tiendaService, storageService) {
        
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            locationService.verifyLocation();
            usuarioService.updateSession();
            tiendaService.updateSession();            
        });
    }
]);

/* @ngInject */
function clearStorageService(storageService) {
    return storageService.clear();
}

/* @ngInject */
function clearSessionService(sessionService) {
    return sessionService.clear();
}

/* @ngInject */
function tiendaPrepService(tiendaService) {
    return tiendaService.getTiendas();
}

/* @ngInject */
function cajaPrepService(cajaService, usuarioService, tiendaService) {
    return cajaService.getCaja(
            usuarioService.getUsuarioActivo().token,
            tiendaService.getTiendaActiva().id
    );
}

/* @ngInject */
function almacenPrepService(almacenService, usuarioService, tiendaService) {
    return almacenService.getAlmacen(
            usuarioService.getUsuarioActivo().token,
            tiendaService.getTiendaActiva().id
    );
}
