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
        
        function vender() {
            locationService.updateCurrentLocation('/venta');            
        }

        function cerrar() {            
            locationService.updateCurrentLocation('/tienda-cerrar');            
        }
    }
})();