'use strict';

angular.module('jollyVentasApp', [
  'ngRoute',  
  'mobile-angular-ui',

  'app.general',
  'app.usuario',
  'app.tienda',
  'app.caja',
  'app.almacen',
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
            controller: 'Login',
            controllerAs: 'vm',
            templateUrl: 'login/login.html',
            reloadOnSearch: false
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
                almacenPrepService: almacenPrepService,
            }
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
            reloadOnSearch: false,
        })
        .otherwise({ redirectTo: '/login' });        
}])
.run(['$rootScope', '$location', '$http', 'usuarioService', 'tiendaService', 'storageService',
    function ($rootScope, $location, $http, usuarioService, tiendaService, storageService) {
        
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            $rootScope.showSideBar = false;
            
            var usuario = usuarioService.getUsuarioActivo();
            if ($location.path() !== '/login' && !usuario ) {
                storageService.clear();
                $location.path('/login');
            }
            
            $rootScope.usuarioNombre =  usuario.persona.nombre;                
            
            var tienda =  tiendaService.getTiendaActiva();  
            if (tienda){
                $rootScope.tiendaNombre = tienda.nombre; 
                if(tienda.info.abierto){
                    $rootScope.showSideBar = true;
                }
            }
        });
    }]);

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

