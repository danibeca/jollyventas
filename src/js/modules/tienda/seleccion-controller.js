(function() {
    'use strict';

    angular
        .module('app.tienda')
        .controller('TiendaSeleccion', Seleccion);

    ////////////////////////////////////////////////////////////////////////////////
    /* @ngInject */
    function Seleccion($rootScope, locationService, tiendaPrepService, tiendaService, sessionService) {

        var vm = this;
        vm.tiendas = tiendaPrepService.puntosdeventa;
        vm.seleccionar = seleccionar;

        sessionService.setVariable("vistaPie", "");
        
        function seleccionar(tienda) {
            $rootScope.tiendaNombre = tienda.nombre;
            tiendaService.setTiendaActiva(tienda);
            locationService.updateCurrentLocation('/tienda-abrir');            
        }
    }
})();