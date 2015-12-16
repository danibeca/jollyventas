'use strict';

angular.module('jollyVentasApp.venta.services', [])
.factory('VentaService',
    ['$http', '$rootScope', '$timeout', 'StorageService',
    function ($http, $rootScope, $timeout, StorageService) {
        var service = {};
 
        service.iniciarVista = function (producto_disponible) {
            // TODO: Traer lógica del controlador
        };

        service.crearVenta = function (punto_venta_id, empleado_id, productos, total, consecutivo) {
            
            var venta = {
              "auth": {
                "token": "AOQWEIPQEW9120"
              },
              "puntodeventa": {
                "id": punto_venta_id
              },
              "empleado": {
                "id": empleado_id
              },
              "consecutivo": consecutivo,
              "subtotal": 20369.1,
              "impuestoconsumo": 1629.53,
              "total": total,
              "detalle": {
                "producto":productos
              }
            };
            var ventas_todas = [];
            var ventas = JSON.parse(StorageService.obtenerVariableLocalStorage("ventas"));
            
            if(ventas){
                ventas_todas = ventas;
            }
            ventas_todas.push(venta);

            StorageService.asignarVariableLocalStorage("ventas", JSON.stringify(ventas_todas));


            /* Real service
             ----------------------------------------------*/
            //$http.post('/api/venta/crear', venta)
            //    .success(function (response) {
            //        
            //        callback(response);
            //    });
        };
        return service;
    }]);