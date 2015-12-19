(function() {
    'use strict';

    angular
        .module('app.general')
        .factory('mockService', mockService);


    /* @ngInject */
    function mockService($http, $q) {                 

        var service = {
            getTiendas: getTiendas,           
            getLogin: getLogin,
            getCaja: getCaja,
            getAlmacen: getAlmacen,            
            abrirTienda: abrirTienda,
        };
        return service;

        ////////////////////////////////////////////////////////

        function getTiendas() {
            var response = {
                "puntosdeventa": [
                    {
                        "id": "1",
                        "idalmacen": "1",
                        "idempleado": "32",
                        "nombre": "Centro Comercial  Santafé II",
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

            var deferred = $q.defer();
            setTimeout(function() {                
                deferred.resolve(response);                                 
            }, 1000);
            return deferred.promise;
        }

        function getLogin(user) {
            var response = { 
                "valido": user.username === 'test' && user.password === 'test',
                "token": "AOQWEIPQEW9120",
                "persona": {
                                "id": "1",
                                "nombre": "Juan Benjumea"
                            },
                "permisos": [
                                1,
                                2,
                                3,
                                5
                            ]
            };
            if(!response.valido) {
                response.message = 'Cedula o contraseña incorrecto';
            } 

            var deferred = $q.defer();
            setTimeout(function() {                
                deferred.resolve(response);                                 
            }, 1000);
            return deferred.promise;
        }        

        function getCaja() {
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

            var deferred = $q.defer();
            setTimeout(function() {                
                deferred.resolve(response);                                 
            }, 1000);
            return deferred.promise;
        }

        function getAlmacen() {
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
                              "img": "vaso.png"
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
                              "img": "jarabe1.png"
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
                              "img": "jarabe2.png"
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
                              "img": "jarabe3.png"
                            }
                          ]
                        }
                       }; 

            var deferred = $q.defer();
            setTimeout(function() {                
                deferred.resolve(response);                                 
            }, 1000);
            return deferred.promise;
        }

        function abrirTienda() {
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

            var deferred = $q.defer();
            setTimeout(function() {                
                deferred.resolve(response);                                 
            }, 1000);
            return deferred.promise;
        }


    }
})();
