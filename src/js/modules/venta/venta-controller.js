(function() {
    'use strict';

    angular
        .module('app.venta')
        .controller('Venta', Venta);


    /* @ngInject */
    function Venta($rootScope, $scope, sessionService, locationService, almacenService, usuarioService, tiendaService) {
        
        var vm = this;
        vm.productos = tiendaService.getProductos();
        iniciarProductos();

        vm.articuloAgregar = articuloAgregar;
        vm.articuloRemover = articuloRemover;

        $rootScope.total = 0;
        $rootScope.crearVenta = crearVenta;
        $rootScope.limpiarVenta = limpiarVenta;

        sessionService.setVariable("vistaPie", "venta/pie-venta.html");
        
        
        ////////////////////////////////////////////////////////////////////////////////
        
        function iniciarProductos(){
            vm.productos_disponibles = [];
            vm.sabores = [  {   "nombre" :  "watermelon",
                                "prod" :    {   "nueve" : {"id": 101, "cantidad": 0, "disponible": false}, 
                                                "doce" : {"id": 102, "cantidad": 0, "disponible": false}
                                            },
                                "disponible" : false
                            },
                            {   "nombre" : "apple",
                                "prod" :    {   "nueve" : {"id": 201, "cantidad": 0, "disponible": false}, 
                                                "doce" : {"id": 202, "cantidad": 0, "disponible": false}
                                            },
                                "disponible" : false
                            },
                            {   "nombre" : "blue",
                                "prod" :    {   "nueve" : {"id": 301, "cantidad": 0, "disponible": false}, 
                                                "doce" : {"id": 302, "cantidad": 0, "disponible": false}
                                            },
                                "disponible" : false
                            },
                            {   "nombre" : "cherry",
                                "prod" :    {   "nueve" : {"id": 401, "cantidad": 0, "disponible": false}, 
                                                "doce" : {"id": 402, "cantidad": 0, "disponible": false}
                                            },
                                "disponible" : false
                            },
                            {   "nombre" : "hersheys",
                                "prod" :    {   "nueve" : {"id": 501, "cantidad": 0, "disponible": false}, 
                                                "doce" : {"id": 502, "cantidad": 0, "disponible": false}
                                            },
                                "disponible" : false
                            },
                            {   "nombre" : "grape",
                                "prod" :    {   "nueve" : {"id": 601, "cantidad": 0, "disponible": false}, 
                                                "doce" : {"id": 602, "cantidad": 0, "disponible": false}
                                            },
                                "disponible" : false
                            }
                        ];
            vm.sabores_disponibles = [];

            angular.forEach(vm.sabores, function(sabor, i) {

                angular.forEach(vm.productos, function(producto, i) {

                    if(sabor.prod.nueve.id === producto.id){
                        sabor.prod.nueve.disponible = true;
                    }

                    if(sabor.prod.doce.id === producto.id){
                        sabor.prod.doce.disponible = true;
                    } 
                    
                }); 

                if(sabor.prod.nueve.disponible === true || sabor.prod.doce.disponible === true){
                    vm.sabores_disponibles.push(sabor);
                }
            });

            vm.sabores = vm.sabores_disponibles;
        }
        
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
