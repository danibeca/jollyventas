(function() {
    'use strict';

    angular
        .module('jollyVentasApp.tienda')
        .controller('Tiendas', Tiendas);

    ////////////////////////////////////////////////////////////////////////////////
    /* @ngInject */
    function Tiendas($rootScope,$location, tiendaPrepService, StorageService) {

        var vm = this;
        vm.tiendas = tiendaPrepService.puntosdeventa;
        vm.seleccionar = seleccionar;
        
        function seleccionar(tienda) {
            $rootScope.tienda = tienda;
            StorageService.guardarJsonObject("puntoventa", tienda);              
            $location.path('/tienda-abrir');            
        }
    }
})();