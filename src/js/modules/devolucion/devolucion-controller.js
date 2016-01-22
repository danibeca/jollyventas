(function() {
    'use strict';

    angular
        .module('app.devolucion')
        .controller('Devolucion', Devolucion);

    /* @ngInject */
    function Devolucion($rootScope, sessionService, locationService, almacenService, usuarioService, devolucionService, tiendaService) {

        var vm = this;
        vm.productos = tiendaService.getProductos();
        vm.sabores = devolucionService.iniciarVista(vm.productos);
        vm.articuloAgregar = articuloAgregar;
        vm.articuloRemover = articuloRemover;
        vm.devolucion_nota = '';

        $rootScope.total = 0;
        $rootScope.crearVenta = crearVenta;
        $rootScope.limpiarVenta = limpiarVenta;

        sessionService.setVariable("vistaPie", "devolucion/pie-devolucion.html");


        ////////////////////////////////////////////////////////////////////////////////

        function articuloAgregar(posicion, tamano){
            var nueva_cantidad = vm.sabores[posicion].prod[tamano].cantidad + 1;
            vm.sabores[posicion].prod[tamano].cantidad = nueva_cantidad;

            var nuevo_total = $rootScope.total + 4000;
            $rootScope.total = nuevo_total;
        }

        function articuloRemover(posicion, tamano){
            if(vm.sabores[posicion].prod[tamano].cantidad > 0){
                var nueva_cantidad = vm.sabores[posicion].prod[tamano].cantidad - 1;
                vm.sabores[posicion].prod[tamano].cantidad = nueva_cantidad;

                var nuevo_total = $rootScope.total - 4000;
                $rootScope.total = nuevo_total;
            }
        }

        function crearVenta(){
            var productos = []
                , tamanos = ['nueve', 'doce']
                , producto;

            angular.forEach(vm.sabores, function(sabor, i) {
                angular.forEach(tamanos, function(tamano, i){
                    producto = sabor.prod[tamano];
                    if(producto.cantidad > 0){
                        productos.push({
                                        "id": producto.id, 
                                        "cantidad": producto.cantidad
                                        });
                    }
                });
            });

            if(productos.length === 0){
                alert('No hay articulo agregados');
            }
            else {
                alert('Devolución guardada correctamente');
                limpiarVenta();
            }
        }

        function limpiarVenta(){
            
            locationService.updateCurrentLocation('/venta');
            /*
            angular.forEach(vm.sabores, function(sabor, i) {
                sabor.prod.nueve.cantidad = 0;
                sabor.prod.doce.cantidad = 0;
            });
            $rootScope.total = 0;
            */
        }
    }
})();
