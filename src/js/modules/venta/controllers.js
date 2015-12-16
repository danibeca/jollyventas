'use strict';

angular.module('jollyVentasApp.venta.controllers', [])

.controller('VentaController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService', 'VentaService', 'StorageService', 
    function ($scope, $rootScope, $location, AuthenticationService,  VentaService, StorageService) {

        var producto_disponible = JSON.parse(StorageService.obtenerVariableLocalStorage('productos'));

            var producto_codigo = {
                                    "901" : {"nombre": "watermelon", "onzas": "9" },
                                    "902" : {"nombre": "watermelon", "onzas": "12" },
                                    "903" : {"nombre": "apple", "onzas": "9" },
                                    "904" : {"nombre": "apple", "onzas": "12" },
                                    "905" : {"nombre": "blue", "onzas": "9" },
                                    "906" : {"nombre": "blue", "onzas": "12" },
                                    "907" : {"nombre": "cherry", "onzas": "9" },
                                    "908" : {"nombre": "cherry", "onzas": "12" },
                                    "909" : {"nombre": "hersheys", "onzas": "9" },
                                    "928" : {"nombre": "hersheys", "onzas": "12" },
                                    "929" : {"nombre": "grape", "onzas": "9" },
                                    "930" : {"nombre": "grape", "onzas": "12" }
            };

            $scope.showArticulo = {"9": {'watermelon' : false,
                                        'apple' : false,
                                        'blue' : false,
                                        'cherry' : false,
                                        'hersheys' : false,
                                        'grape' : false
                                    },
                                "12": {'watermelon' : false,
                                        'apple' : false,
                                        'blue' : false,
                                        'cherry' : false,
                                        'hersheys' : false,
                                        'grape' : false
                                    }
                                };

            var producto_id
                , producto_nombre
                , producto_onzas
                , productos_visibles = []
                , productos_visibles_1 = []
                , productos_visibles_2 = [];

            for(var i in producto_disponible){
                producto_id = producto_disponible[i]['id'];
                producto_nombre = producto_codigo[producto_id]["nombre"];
                producto_onzas = producto_codigo[producto_id]["onzas"];
                $scope.showArticulo[producto_onzas][producto_nombre] = true;
                productos_visibles.push(producto_nombre);
            }

            productos_visibles.sort();
            var producto_auxiliar = ''
                , producto_actual
                , count = 0;

            for(var i in productos_visibles){
                producto_actual = productos_visibles[i];
                if(producto_actual !== producto_auxiliar){
                    producto_auxiliar = producto_actual;
                    if(count < 3){
                        productos_visibles_1.push(producto_actual);
                    }
                    else {
                        productos_visibles_2.push(producto_actual);
                    }
                    count++;
                }
            }

            $scope.articulos = {"1": productos_visibles_1,
                                "2": productos_visibles_2
                            };

            $scope.cantidad = {"9": {'watermelon' : "0",
                                        'apple' : "0",
                                        'blue' : "0",
                                        'cherry' : "0",
                                        'hersheys' : "0",
                                        'grape' : "0"
                                    },
                                "12": {'watermelon' : "0",
                                        'apple' : "0",
                                        'blue' : "0",
                                        'cherry' : "0",
                                        'hersheys' : "0",
                                        'grape' : "0"
                                    }
                                };

    	$rootScope.total = 0;
    	$rootScope.vistaPie = 'venta/pie-venta.html';
                        

    	$scope.articulo_agregar = function(articulo, onzas){

                var nuevo_valor = parseInt($scope.cantidad[onzas][articulo]) + 1;
                $scope.cantidad[onzas][articulo] = nuevo_valor;
                
                var nuevo_total = $rootScope.total + 4000;
                $rootScope.total = nuevo_total;
    	};
    	$scope.articulo_remover = function(articulo, onzas){
            if($scope.cantidad[onzas][articulo] > 0){
                var nuevo_valor = parseInt($scope.cantidad[onzas][articulo]) - 1;
                $scope.cantidad[onzas][articulo] = nuevo_valor;
                
                var nuevo_total = $rootScope.total - 4000;
                $rootScope.total = nuevo_total;
            }
    	};
        
        $rootScope.venta_limpiar = function(){
            $rootScope.total = 0;
            $scope.cantidad = {"9": {'watermelon' : "0",
                                    'apple' : "0",
                                    'blue' : "0",
                                    'cherry' : "0",
                                    'hersheys' : "0",
                                    'grape' : "0"
                                },
                            "12": {'watermelon' : "0",
                                    'apple' : "0",
                                    'blue' : "0",
                                    'cherry' : "0",
                                    'hersheys' : "0",
                                    'grape' : "0"
                                }
                            };
        };

        $rootScope.venta_crear = function(){
            var producto_codigo = {"9": {'watermelon' : '901',
                                        'apple' : '903',
                                        'blue' : '905',
                                        'cherry' : '907',
                                        'hersheys' : '909',
                                        'grape' : '929'
                                    },
                                "12": {'watermelon' : '902',
                                        'apple' : '904',
                                        'blue' : '906',
                                        'cherry' : '908',
                                        'hersheys' : '928',
                                        'grape' : '930'
                                    }
                                };

            var total = $rootScope.total;
            var articulos = document.getElementsByClassName('js_cantidad');
            var i
                , id
                , cantidad
                , sabor
                , onzas
                , valor_unitario = 4629
                , subtotal
                , producto
                , productos = [];

            for (i = 0; i < articulos.length; i++) {
                cantidad = parseInt(articulos[i].value);
                if(cantidad !== 0){
                    sabor = articulos[i].getAttribute("data-articulo");
                    onzas = articulos[i].getAttribute("data-onzas");
                    id = producto_codigo[onzas][sabor];

                    subtotal = valor_unitario * cantidad;
                    producto = {"id": id,
                                "nombre": "12 Onz Cherry",
                                "cantidad": cantidad,
                                "valorunitario": valor_unitario,
                                "valor": subtotal};
                    productos.push(producto);
                }
            }

            var punto_venta = JSON.parse(StorageService.obtenerVariableLocalStorage('puntoventa'));
            var consecutivo = StorageService.obtenerVariableLocalStorage('consecutivo');
            consecutivo++;
            
            StorageService.asignarVariableLocalStorage("consecutivo", consecutivo);
            
            var acumulado_caja = StorageService.obtenerVariableLocalStorage('acumulado_caja');
            var nuevo_acumulado = parseInt(acumulado_caja) + parseInt(total);
            StorageService.asignarVariableLocalStorage("acumulado_caja", nuevo_acumulado);

            VentaService.crearVenta(punto_venta.id, punto_venta.idempleado, productos, total, consecutivo);
            
            $rootScope.total = 0;
            $scope.cantidad = {"9": {'watermelon' : "0",
                                    'apple' : "0",
                                    'blue' : "0",
                                    'cherry' : "0",
                                    'hersheys' : "0",
                                    'grape' : "0"
                                },
                            "12": {'watermelon' : "0",
                                    'apple' : "0",
                                    'blue' : "0",
                                    'cherry' : "0",
                                    'hersheys' : "0",
                                    'grape' : "0"
                                }
                            };
                            
            
        };
    }]);
