'use strict';

angular.module('jollyVentasApp.tienda.services', [])
.factory('TiendaService',
    ['$http', '$rootScope', '$timeout',
    function ($http, $rootScope, $timeout) {
        var service = {};

        service.clearCredentials = function () {
            $rootScope.user = {};  
            $cookieStore.remove('user');          
        };
 
        service.getList = function (callback) {
 
            /* Dummy get branches for testing, uses $timeout to simulate api call
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
 
            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.get('/api/tienda/list', { auth: $rootScope.user.token, persona: $rootScope.user.persona.nombre })
            //    .success(function (response) {
            //        
            //        callback(response);
            //    });
 
        };     
        return service;
    }]);