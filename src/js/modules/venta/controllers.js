'use strict';

angular.module('jollyVentasApp.venta.controllers', [])

.controller('VentaController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService', 'VentaService',
    function ($scope, $rootScope, $location, AuthenticationService, VentaService) {

    	$scope.cantidad_11 = [];
    	$scope.cantidad_16 = [];
        $scope.cantidad = {"11": {'watermelon' : "0",
                                    'apple' : "0",
                                    'blue' : "0",
                                    'cherry' : "0",
                                    'hersheys' : "0",
                                    'grape' : "0"
                                },
                            "16": {'watermelon' : "0",
                                    'apple' : "0",
                                    'blue' : "0",
                                    'cherry' : "0",
                                    'hersheys' : "0",
                                    'grape' : "0"
                                }
                            };
    	$rootScope.total = 0;
    	$rootScope.vistaPie = 'venta/pie-venta.html';

        var almacen_id = 1;
        $scope.articulos = {"1": ["watermelon", "apple", "blue"],
                            "2": ["cherry", "hersheys", "grape"]
                        };
        $scope.articulosTodos = ["watermelon", "apple", "blue" ,"cherry", "hersheys", "grape"];
                        
        VentaService.Articles(almacen_id, function(response) {
        });

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
            $scope.cantidad = {"11": {'watermelon' : "0",
                                    'apple' : "0",
                                    'blue' : "0",
                                    'cherry' : "0",
                                    'hersheys' : "0",
                                    'grape' : "0"
                                },
                            "16": {'watermelon' : "0",
                                    'apple' : "0",
                                    'blue' : "0",
                                    'cherry' : "0",
                                    'hersheys' : "0",
                                    'grape' : "0"
                                }
                            };
        };
    }]);
