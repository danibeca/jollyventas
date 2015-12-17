(function() {
    'use strict';

    angular
        .module('jollyVentasApp.general.services')
        .factory('mockService', mockService);

        /* @ngInject */
        function mockService($http, $q) {                 

          var service = {
            getListTiendas: getListTiendas           
          };
          return service;
          
          //////////////////////////
          function getListTiendas() {
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
        }
})();
