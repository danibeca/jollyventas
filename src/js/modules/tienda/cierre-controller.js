'use strict';

    angular
        .module('app.tienda')

        .controller('TiendaCerrarController',
            ['$scope', '$rootScope', '$location', 'TiendaService', 'storageService', 'almacenService',
            function ($scope, $rootScope, $location, TiendaService, StorageService, almacenService) {

                $rootScope.vistaPie = "tienda/pie-cerrar.html";

                $scope.caja_final = '';
                $scope.cierre_nota = '';

                $rootScope.ciere_nota = '';
                $scope.caja_inicial = JSON.parse(StorageService.obtenerVariableLocalStorage('caja')).dineroactual;
                var vantas_cantidad = JSON.parse(StorageService.obtenerVariableLocalStorage("ventas"));
                if(vantas_cantidad){
                    $scope.vantas_cantidad = vantas_cantidad.length;
                }
                else {
                    $scope.vantas_cantidad = 0;
                }
                $scope.acumulado_caja = StorageService.obtenerVariableLocalStorage('acumulado_caja');
                $scope.dinero_final = parseInt($scope.caja_inicial) + parseInt($scope.acumulado_caja);

                $scope.almacen = almacenService.getAlmacenActual()
                

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
                        //$location.path('/login');
                    });
                };

                $rootScope.limpiar_tienda = function(){
                    TiendaService.getInformacionCaja(function(response) {
                      $scope.caja = response.caja;                            
                    });         
                    
                };
            }]);