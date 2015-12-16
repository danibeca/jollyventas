'use strict';

angular.module('jollyVentasApp.tienda.controllers', [])

.controller('TiendaSeleccionarController',
    ['$scope', '$rootScope', '$location', 'TiendaService', 
    function ($scope, $rootScope, $location, TiendaService) {

        TiendaService.getList(function(response) {
            $scope.tiendas = response.puntosdeventa;
        });

        $scope.seleccionar = function(tienda){
            $rootScope.tienda = tienda;
            $location.path('/tienda-abrir');
        };
    }])

.controller('TiendaAbrirController',
    ['$scope', '$rootScope', '$location', 'TiendaService', 'StorageService',
    function ($scope, $rootScope, $location, TiendaService, StorageService) {
        
        $rootScope.vistaPie = "tienda/pie-abrir.html";

        TiendaService.getInformacionCaja(function(response) {
            $scope.caja = response.caja;            
            StorageService.asignarVariableLocalStorage("caja", JSON.stringify(response));              
        });

        TiendaService.getInventario(function(response) {
            $scope.almacen = response.almacen;
            StorageService.asignarVariableLocalStorage("almacen", JSON.stringify(response.almacen));  
        });

        $rootScope.abrir_tienda = function(){
            TiendaService.abrirTienda(function(response){
                StorageService.asignarVariableLocalStorage("tienda", JSON.stringify(response));  
                StorageService.asignarVariableLocalStorage("productos", JSON.stringify(response.productos));
                StorageService.asignarVariableLocalStorage("consecutivo", JSON.stringify(response.facturacion.actual));  
                $location.path('/venta');           
            });
        };

        $rootScope.limpiar_tienda = function(){
            TiendaService.getInformacionCaja(function(response) {
              $scope.caja = response.caja;                            
            });         
            
        };

    }])

.controller('TiendaCerrarController',
    ['$scope', '$rootScope', '$location', 'TiendaService',
    function ($scope, $rootScope, $location, TiendaService) {

        $scope.texto = "cerrando";
    }]);
