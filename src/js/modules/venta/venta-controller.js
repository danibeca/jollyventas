(function() {
    'use strict';

    angular
        .module('app.venta')
        .controller('Venta', Venta);

    /* @ngInject */
    function Venta($rootScope, sessionService, locationService, almacenService, usuarioService, ventaService, tiendaService) {

        var vm = this;
        vm.productos = tiendaService.getProductos();
        vm.sabores = ventaService.iniciarVista(vm.productos);
        vm.articuloAgregar = articuloAgregar;
        vm.articuloRemover = articuloRemover;

        $rootScope.total = 0;
        $rootScope.crearVenta = crearVenta;
        $rootScope.limpiarVenta = limpiarVenta;

        sessionService.setVariable("vistaPie", "venta/pie-venta.html");


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
                alert('Venta creada correctamente');
                limpiarVenta();
            }
        }

        function limpiarVenta(){
            angular.forEach(vm.sabores, function(sabor, i) {
                sabor.prod.nueve.cantidad = 0;
                sabor.prod.doce.cantidad = 0;
            });
            $rootScope.total = 0;
        }
    }
})();
