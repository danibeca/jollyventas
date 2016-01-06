(function() {
    'use strict';

    angular
        .module('app.tienda')
        .controller('TiendaApertura', Apertura);


    /* @ngInject */
    function Apertura($rootScope, sessionService, locationService, cajaPrepService, almacenPrepService, cajaService, almacenService, usuarioService, tiendaService) {

        var vm = this;
        vm.caja = cajaPrepService.caja;
        vm.caja.dineroreal = vm.caja.dineroactual;
        vm.almacen = almacenPrepService.almacen;        

        $rootScope.abrirTienda = abrirTienda;
        $rootScope.limpiarTienda = limpiarTienda;
        
        sessionService.setVariable("vistaPie", "tienda/pie-abrir.html");

        ////////////////////////////////////////////////////////////////////////////////

        function abrirTienda() {
            actualizarInformacion();
            
            var tienda = tiendaService.getTiendaActiva();
            tiendaService.abrirTienda(usuarioService.getUsuariActivo,
                                      tienda,
                                      vm.caja,
                                      vm.almacen.articulos
                          )             
                         .then(abrirTiendaComplete);

            function abrirTiendaComplete(data) {
                tienda.info = data;
                tiendaService.setTiendaActiva(tienda);
                tiendaService.setConsecutivo(tienda.info.facturacion.actual);
                locationService.updateCurrentLocation('/venta');
            }

            function actualizarInformacion(){
                vm.caja.dineroactual = vm.caja.dineroreal;
                delete vm.caja.dineroreal;

                angular.forEach(vm.almacen.articulos, function(articulo, i) {
                    articulo.cantidad =  articulo.cantidadactual;
                    articulo.cantidadfinal = '';
                    delete articulo.cantidadactual;                   
                });
                cajaService.setCajaActual(vm.caja);
                almacenService.setAlmacenActual(vm.almacen);
            }
        }

        function limpiarTienda(){
            vm.caja.dineroreal = vm.caja.dineroactual;
            angular.forEach(vm.almacen.articulos, function(articulo, i) {
                articulo.cantidadactual = articulo.cantidad;
            });
        }

    }
})();