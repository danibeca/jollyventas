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
    ['$scope', '$rootScope', '$location', 'TiendaService',
    function ($scope, $rootScope, $location, TiendaService) {
        
        //DELETE THIS -> FIND A BETTER WAY
        $rootScope.vistaPie = "";

        TiendaService.getInformacionCaja(function(response) {
            $scope.caja = response.caja;
        });

        TiendaService.getInventario(function(response) {
            $scope.almacen = response.almacen;
        });

        TiendaService.getInventario(function(response) {
            $scope.inventario = response.caja;
        });

        $scope.TiendaAbrir = function(){
            TiendaService.abrirTienda(function(response){
                console.log('guardando productos');
                console.log(response.productos);
                localStorage.setItem("productos", JSON.stringify(response.productos));

                $location.path('/venta');
            });
        }
    }])

.controller('TiendaCerrarController',
    ['$scope', '$rootScope', '$location', 'TiendaService',
    function ($scope, $rootScope, $location, TiendaService) {

        $scope.texto = "cerrando";
    }]);
