'use strict';

angular
.module('app.tienda')
.factory('TiendaService',
    ['$http', '$rootScope', '$timeout', 'storageService',
    function ($http, $rootScope, $timeout, StorageService) {
        var service = {};

          service.cerrarTienda = function (punto_venta_id, empleado_id, caja_id, caja_actual, productos, cierre_nota, callback){
 
            var cierre = {
                            "auth": {
                                "token": "AOQWEIPQEW9120"
                              },
                              "puntodeventa": {
                                "id": punto_venta_id
                              },
                              "empleado": {
                                "id": empleado_id
                              },
                              "caja": {
                                "id": caja_id,
                                "dinero": caja_actual
                              },
                              "articulos": productos,
                              "observaciones": cierre_nota
                            };
            console.log(cierre);
            StorageService.asignarVariableLocalStorage("acumulado_caja", 0);
            
            /* Dummy 
             ----------------------------------------------*/
            $timeout(function(){
                var response = {};                
                callback(response);
            }, 1000); 
 
            /* Real service
             ----------------------------------------------*/
            //$http.get('/api/tienda/cerrar', cierre)
            //    .success(function (response) {
            //        
            //        callback(response);
            //    });
        };
        

        service.setProducts

        return service;
    }]);