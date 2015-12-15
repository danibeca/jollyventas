'use strict';

angular.module('jollyVentasApp.tienda.services', [])
.factory('TiendaService',
    ['$http', '$rootScope', '$timeout',
    function ($http, $rootScope, $timeout) {
        var service = {};

        service.getList = function (callback) {
 
            /* Dummy
             ----------------------------------------------*/
            $timeout(function(){
                var response = {
                                  "puntosdeventa": [
                                    {
                                      "id": "1",
                                      "idalmacen": "1",
                                      "idempleado": "32",
                                      "nombre": "Centro Comercial  Santafé",
                                      "ubicacion": "Local 1015"
                                    },
                                    {
                                      "id": "2",
                                      "idalmacen": "1002",
                                      "idempleado": "33",
                                      "nombre": "Terminal del Sur",
                                      "ubicacion": "Zona Transportes"
                                    }
                                  ]
                                };                
                callback(response);
            }, 1000); 
 
            /* Real service
             ----------------------------------------------*/
            //$http.get('/api/tienda/list', { [ auth: { token : $rootScope.user.token } ],
            //                                [ persona: {id : $rootScope.user.persona.id } ]
            //                              })
            //    .success(function (response) {
            //        
            //        callback(response);
            //    });
 
        };  

        service.getInformacionCaja = function (callback) {
 
            /* Dummy 
             ----------------------------------------------*/
            $timeout(function(){
                var response = {
                                "caja": {
                                  "id": "1005",
                                  "dineroactual": "25000",
                                  "ultimocierre": {
                                    "id": "9456",
                                    "fecha": "2015-12-11 20:00",
                                    "dinero": "25000",
                                    "empleado": {
                                      "id": "36",
                                      "nombre": "Andres Urrea"
                                    }
                                  },
                                  "ultimaapertura": {
                                    "id": "9982",
                                    "fecha": "2015-12-11 08:00",
                                    "dinero": "1000",
                                    "empleado": {
                                      "id": "36",
                                      "nombre": "Andres Urrea"
                                    }
                                  }
                                }
                              };                
                callback(response);
            }, 1000); 
 
            /* Real service
             ----------------------------------------------*/
            //$http.get('/api/tienda/caja', { [ auth: { token : $rootScope.user.token } ],
            //                                [ puntodeventa: {id : $rootScope.tienda.id } ]
            //                              })
            //    .success(function (response) {
            //        
            //        callback(response);
            //    });
 
        };

        service.getInventario = function (callback) {
 
            /* Dummy
             ----------------------------------------------*/
            $timeout(function(){
                var response = {
                                "almacen": {
                                  "id": "1",
                                  "nombre": "Punto de Venta",
                                  "valorcosto": "1000000",
                                  "valorprecio": "2500000",
                                  "articulos": [
                                    {
                                      "id": "962",
                                      "idarticulo": "1",
                                      "codigo": "MP001",
                                      "nombre": "Vaso 11 Onz",
                                      "unidad": "Und",
                                      "cantidad": "250",
                                      "costounitario": "10",
                                      "preciounitario": "20",
                                      "img": "MP001.png"
                                    },
                                    {
                                      "id": "964",
                                      "idarticulo": "2",
                                      "codigo": "MP002",
                                      "nombre": "Jarabe Blue Raspberry",
                                      "unidad": "Onz",
                                      "cantidad": "90",
                                      "costounitario": "50",
                                      "preciounitario": "100",
                                      "img": "MP002.png"
                                    },
                                    {
                                      "id": "963",
                                      "idarticulo": "3",
                                      "codigo": "MP003",
                                      "nombre": "Jarabe Cherry",
                                      "unidad": "Onz",
                                      "cantidad": "60",
                                      "costounitario": "50",
                                      "preciounitario": "100",
                                      "img": "MP003.png"
                                    },
                                    {
                                      "id": "966",
                                      "idarticulo": "4",
                                      "codigo": "MP004",
                                      "nombre": "Jarabe Apple",
                                      "unidad": "Onz",
                                      "cantidad": "45",
                                      "costounitario": "50",
                                      "preciounitario": "100",
                                      "img": "MP004.png"
                                    }
                                  ]
                                }
                               };                
                callback(response);
            }, 1000); 
 
            /* Real service
             ----------------------------------------------*/
            //$http.get('/api/tienda/inventario', { [ auth: { token : $rootScope.user.token } ],
            //                                      [ almacen: {id : $rootScope.tienda.idalmacen } ]
            //                              })
            //    .success(function (response) {
            //        
            //        callback(response);
            //    });
 
        };    

        service.abrirTienda = function (callback){
 
            /* Dummy 
             ----------------------------------------------*/
            $timeout(function(){
                var response = {
                                  "abierto": true,
                                  "razonsocial": "Mántum S.A.S",
                                  "nit": "900140127-1",
                                  "facturacion": {
                                    "resolucion": "Resolución 432403400 de 10 de agosto de 2015",
                                    "inicio": "000001",
                                    "fin": "999999",
                                    "actual": "000972"
                                  },
                                  "productos": [
                                    {
                                      "id": 928,
                                      "nombre": "9 Onz Cherry"
                                    },
                                    {
                                      "id": 929,
                                      "nombre": "12 Onz Cherry"
                                    },
                                    {
                                      "id": 930,
                                      "nombre": "9 Onz Apple"
                                    }
                                  ],
                                  "pedidos": [
                                    {
                                      "id": 1923
                                    },
                                    {
                                      "id": 1924
                                    }
                                  ]
                                };                
                callback(response);
            }, 1000); 
 
            /* Real service
             ----------------------------------------------*/
            //$http.get('/api/tienda/abrir', { [ auth: { token : $rootScope.user.token } ],
            //                                [ puntodeventa: {id : $rootScope.tienda.id } ]
            //                                [ empleado: {id : $rootScope.user.persona.id } ]
            //                              })
            //    .success(function (response) {
            //        
            //        callback(response);
            //    });
        };

        service.setProducts

        return service;
    }]);