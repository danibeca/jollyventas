(function() {
    'use strict';

    angular
        .module('app.tienda')
        .controller('TiendaCierre', Cierre);

    /* @ngInject */
    function Cierre($rootScope, sessionService, locationService, cajaService, almacenService, usuarioService, tiendaService) {

        var vm = this;
        vm.caja = cajaService.getCajaActual();
        vm.almacen = almacenService.getAlmacenActual();
        vm.cierre_nota = '';
        
        console.log('-------------');
        console.log('caja: ');
        console.log(vm.caja);
        console.log('-------------');
        console.log('almacen: ');
        console.log(vm.almacen);
        console.log('-------------');
        
        // TODO: Obtner cantidad y dinero de ventas
        
        $rootScope.cerrarTienda = cerrarTienda;
        $rootScope.limpiarTienda = limpiarTienda;
        sessionService.setVariable("vistaPie", "tienda/pie-cerrar.html");

        ////////////////////////////////////////////////////////////////////////////////

        function cerrarTienda() {
            
            console.log('cerrando 1');
            var tienda = tiendaService.getTiendaActiva();
            tiendaService.cerrarTienda(usuarioService.getUsuarioActivo,
                                          tienda,
                                          vm.caja,
                                          vm.almacen.articulos,
                                          vm.cierre_nota
                            );
        }

        function cerrarTiendaComplete(){
            console.log('redirect a login');
            locationService.updateCurrentLocation('/login');
        }
        
        function limpiarTienda(){
            vm.caja.dinerofinal = '';
            angular.forEach(vm.almacen.articulos, function(articulo, i) {
                articulo.cantidadfinal = '';
            });
            vm.cierre_nota = '';
        }




        /*
        
        $rootScope.cerrar_tienda = function(){

            var caja = JSON.parse(StorageService.obtenerVariableLocalStorage('caja'));
            var caja_id = caja.id;

            var articulos = document.getElementsByClassName('js_cantidad');
            var i
                , id
                , cantidad
                , producto
                , productos = [];

            for (i = 0; i < articulos.length; i++) {
                cantidad = parseInt(articulos[i].value);
                id = articulos[i].getAttribute("data-articulo");
                producto = {"id": id,
                            "nombre": "12 Onz Cherry",
                            "cantidad": cantidad
                        };
                productos.push(producto);
            }

            var punto_venta = JSON.parse(StorageService.obtenerVariableLocalStorage('tienda'));
            StorageService.asignarVariableLocalStorage("caja_final", $scope.caja_final);
            StorageService.asignarVariableLocalStorage("inventario_final", JSON.stringify(productos));

            TiendaService.cerrarTienda(punto_venta.id, punto_venta.idempleado, caja_id, $scope.caja_final, productos, $scope.cierre_nota, function(response){

            locationService.updateCurrentLocation('/login');

            });
        };

        $rootScope.limpiar_tienda = function(){
            TiendaService.getInformacionCaja(function(response) {
              $scope.caja = response.caja;                            
            });         

        };
        
        */
    }
})();