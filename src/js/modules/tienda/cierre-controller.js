(function() {
    'use strict';

    angular
        .module('app.tienda')
        .controller('TiendaCierre', Cierre);


    /* @ngInject */
    function Cierre($rootScope, $scope, sessionService, locationService, cajaService, almacenService, usuarioService, tiendaService) {

        var vm = this;
        vm.caja = cajaService.getCajaActual();
        vm.almacen = almacenService.getAlmacenActual();
        vm.cierre_nota = '';

        // TODO: Obtner cantidad y dinero de ventas
        
        $rootScope.cerrarTienda = cerrarTienda;
        $rootScope.limpiarTienda = limpiarTienda;
        sessionService.setVariable("vistaPie", "tienda/pie-cerrar.html");

        ////////////////////////////////////////////////////////////////////////////////

        function cerrarTienda() {

            var tienda = tiendaService.getTiendaActiva();
            tiendaService.cerrarTienda(usuarioService.getUsuarioActivo().persona.id,
                                          tienda,
                                          vm.caja,
                                          vm.almacen.articulos,
                                          vm.cierre_nota
                            )
                            .then(cerrarTiendaComplete);
            
        }

        function cerrarTiendaComplete(){
            locationService.updateCurrentLocation('/login');
        }
        
        function limpiarTienda(){
            locationService.updateCurrentLocation('/venta');
            /*
            vm.caja.dinerofinal = '';
            angular.forEach(vm.almacen.articulos, function(articulo, i) {
                articulo.cantidadfinal = '';
            });
            vm.cierre_nota = '';
            */
        }
    }
})();