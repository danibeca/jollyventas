'use strict';

    angular
        .module('jollyVentasApp.tienda')

        .controller('TiendaAbrirController',
            ['$scope', '$rootScope', '$location', 'TiendaService', 'StorageService',
            function ($scope, $rootScope, $location, TiendaService, StorageService) {
                
                $rootScope.vistaPie = "tienda/pie-abrir.html";

                TiendaService.getInformacionCaja(function(response) {
                    $scope.caja = response.caja;             
                    $scope.caja.dineroreal = $scope.caja.dineroactual;                    
                });

                TiendaService.getInventario(function(response) {
                    $scope.almacen = response.almacen;                    
                    StorageService.asignarVariableLocalStorage("almacen", JSON.stringify(response.almacen));  
                });

                $rootScope.abrir_tienda = function(){
                    $scope.caja.dineroactual = $scope.caja.dineroreal;
                    delete $scope.caja.dineroreal;

                    angular.forEach($scope.almacen.articulos, function(articulo, i) {
                       articulo.cantidad =  articulo.cantidad_actual;
                       delete articulo.cantidad_actual;                   
                    });

                    console.log('Articulos' + JSON.stringify($scope.almacen.articulos));
                    console.log('Articulos' + JSON.stringify($scope.caja));


                    var punto_venta = JSON.parse(StorageService.obtenerVariableLocalStorage('puntoventa'));
                    StorageService.asignarVariableLocalStorage("caja_inicial", $scope.caja.dineroactual);
                    StorageService.asignarVariableLocalStorage("inventario_inicial", JSON.stringify($scope.almacen.articulos));

                    TiendaService.abrirTienda(punto_venta.id, punto_venta.idempleado, $scope.caja.id, $scope.caja, $scope.almacen.articulos, function(response){
                        StorageService.asignarVariableLocalStorage("tienda", JSON.stringify(response));  
                        StorageService.asignarVariableLocalStorage("productos", JSON.stringify(response.productos));
                        StorageService.asignarVariableLocalStorage("consecutivo", response.facturacion.actual);

                       $location.path('/venta');           
                    });
                };

                $rootScope.limpiar_tienda = function(){
                    $scope.caja.dineroreal = $scope.caja.dineroactual;
                    angular.forEach($scope.almacen.articulos, function(articulo, i) {
                        articulo.cantidad_actual = articulo.cantidad;
                    });
                };
            }])

        .controller('TiendaCerrarController',
            ['$scope', '$rootScope', '$location', 'TiendaService', 'StorageService',
            function ($scope, $rootScope, $location, TiendaService, StorageService) {

                $rootScope.vistaPie = "tienda/pie-cerrar.html";

                $scope.caja_final = '';
                $scope.cierre_nota = '';

                $rootScope.ciere_nota = '';
                $scope.caja_inicial = StorageService.obtenerVariableLocalStorage('caja_inicial');
                var vantas_cantidad = JSON.parse(StorageService.obtenerVariableLocalStorage("ventas"));
                if(vantas_cantidad){
                    $scope.vantas_cantidad = vantas_cantidad.length;
                }
                else {
                    $scope.vantas_cantidad = 0;
                }
                $scope.acumulado_caja = StorageService.obtenerVariableLocalStorage('acumulado_caja');
                $scope.dinero_final = parseInt($scope.caja_inicial) + parseInt($scope.acumulado_caja);

                TiendaService.getInventario(function(response) {
                    $scope.almacen = response.almacen;
                    StorageService.asignarVariableLocalStorage("almacen", JSON.stringify(response.almacen));  
                });

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

                    var punto_venta = JSON.parse(StorageService.obtenerVariableLocalStorage('puntoventa'));
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