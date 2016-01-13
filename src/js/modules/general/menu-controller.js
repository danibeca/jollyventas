(function() {
    'use strict';

    angular
        .module('app.general')
        .controller('Menu', Menu);

    ////////////////////////////////////////////////////////////////////////////////
    /* @ngInject */
    function Menu(locationService) {

        var vm = this;
        vm.vender = vender;
        vm.cerrar = cerrar;
        vm.devolver = devolver;

        function vender() {
            locationService.updateCurrentLocation('/venta');
        }
        
        function devolver() {
            locationService.updateCurrentLocation('/devolucion');
        }

        function cerrar() {            
            locationService.updateCurrentLocation('/tienda-cerrar');            
        }

    }
})();