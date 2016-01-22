(function() {
    'use strict';
    
    angular
        .module('app.devolucion')
        .factory('devolucionService', devolucionService);
    
    /* @ngInject */
    
    function devolucionService($http, sessionService, storageService , mockService, productoService) {
        
        var service = {
            iniciarVista: iniciarVista,
            crearVenta: crearVenta
        };
        return service;
        
        //////////////////////////////////////////////////////
        function iniciarVista(producto_disponible) {

            var sabores = productoService.getProductos();
            var sabores_disponibles = [];

            angular.forEach(sabores, function(sabor, i) {
                
                angular.forEach(producto_disponible, function(producto, i) {

                    if(sabor.prod.nueve.id === producto.id){
                        sabor.prod.nueve.disponible = true;
                    }

                    if(sabor.prod.doce.id === producto.id){
                        sabor.prod.doce.disponible = true;
                    }
                }); 

                if(sabor.prod.nueve.disponible === true || sabor.prod.doce.disponible === true){
                    sabores_disponibles.push(sabor);
                }
            });

            return sabores = sabores_disponibles;
            
        };

        function crearVenta(punto_venta_id, empleado_id, productos, total, consecutivo) {
            
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
    }
})();