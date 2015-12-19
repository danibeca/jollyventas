(function() {
    'use strict';

    angular
        .module('app.tienda')
        .controller('TiendaSeleccion', Seleccion);

    ////////////////////////////////////////////////////////////////////////////////
    /* @ngInject */
    function Seleccion($rootScope, $location, tiendaPrepService, tiendaService) {

        var vm = this;
        vm.tiendas = tiendaPrepService.puntosdeventa;
        vm.seleccionar = seleccionar;
        
        function seleccionar(tienda) {
            $rootScope.tiendaNombre = tienda.nombre;
            tiendaService.setTiendaActiva(tienda);              
            $location.path('/tienda-abrir');            
        }
    }
})();