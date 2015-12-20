(function() {
    'use strict';

    angular
        .module('app.tienda')
        .controller('TiendaSeleccion', Seleccion);

    ////////////////////////////////////////////////////////////////////////////////
    /* @ngInject */
    function Seleccion($rootScope, locationService, tiendaPrepService, tiendaService) {

        var vm = this;
        vm.tiendas = tiendaPrepService.puntosdeventa;
        vm.seleccionar = seleccionar;
        
        function seleccionar(tienda) {
            $rootScope.tiendaNombre = tienda.nombre;
            tiendaService.setTiendaActiva(tienda);              
            locationService.updateCurrentLocation('/tienda-abrir');            
        }
    }
})();