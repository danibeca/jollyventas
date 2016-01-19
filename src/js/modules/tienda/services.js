(function() {
    'use strict';

    angular
        .module('app.tienda')
        .factory('tiendaService', tiendaService);

    /* @ngInject */
    function tiendaService($http, sessionService, mockService, storageService) {  
        var tiendaActiva
            , productos
            , consecutivo;

        var service = {
            getTiendas: getTiendas,  
            abrirTienda: abrirTienda,
            cerrarTienda: cerrarTienda,
            setTiendaActiva: setTiendaActiva,
            getTiendaActiva: getTiendaActiva,
            cleanTiendaActiva: cleanTiendaActiva,
            setConsecutivo: setConsecutivo,
            getConsecutivo: getConsecutivo,           
            setProductos: setProductos,
            getProductos: getProductos,
            getSiguienteConsecutivo: getSiguienteConsecutivo,
            updateSession: updateSession,
            clearTiendaActiva: clearTiendaActiva
        };
        return service;
          
        //////////////////////////////////////////////////////

        function getTiendas() {
            return mockService.getTiendas()             
          //return $http.get('/api/maa')
                .then(getTiendasComplete)
                .catch(getTiendasFailed);

            function getTiendasComplete(data, status, headers, config) {               
                return data;
            }

            function getTiendasFailed(error) {
                console.log('getTiendasFailed XHR Failed for' + error.data);                
            }
        }

        function abrirTienda(user, tienda, caja, articulos) {        
            return mockService.abrirTienda()             
            //return $http.get('server/tienda/abrir/', getRequestJson)
                .then(abrirTiendaComplete)
                .catch(abrirTiendaFailed);

            function abrirTiendaComplete(data, status, headers, config) {               
                return data;
            }

            function abrirTiendaFailed(error) {
                console.log('abrirTiendaFailed XHR Failed for' + error.data);                
            }

            function getRequestJson() {
                return  '{}';           
            }
        }

        function cerrarTienda(user, tienda, caja, articluos, observaciones){

            return mockService.cerrarTienda()
            //return $http.post('server/tienda/cerrar/', getRequestJson)
                .then(cerrarTiendaComplete)
                .catch(cerrarTiendaFailed);

            function cerrarTiendaComplete(data, status, headers, config) {               
                return data;
            }

            function cerrarTiendaFailed(error) {
                console.log('cerrarTiendaFailed XHR Failed for' + error.data);                
            }

            function getRequestJson(user, tienda, caja, articluos, observaciones) {
                return '{}';
            }
        }

        function cleanTiendaActiva() {
            storageService.cleanObject('tienda');
        }

        function setTiendaActiva(data) {
            tiendaActiva = data;
            storageService.setJsonObject('tienda', data);
        }

        function getTiendaActiva() {
             if(!tiendaActiva){
                tiendaActiva = storageService.getJsonObject('tienda');
             }
             return tiendaActiva;  
        }

        function setConsecutivo(cons) {
            consecutivo = parseInt(cons);
            storageService.setJsonObject('consecutivo', cons);
        }

        function getConsecutivo() {
             if(!consecutivo){
                consecutivo = parseInt(storageService.getJsonObject('consecutivo'));
             }
             return consecutivo;  
        }

        function setProductos(productos) {
            storageService.setJsonObject('tiendaProductos', productos);
        }

        function getProductos() {
            if(!productos){
                productos = storageService.getJsonObject('tiendaProductos');
            }
             return productos;
        }
        
        function getSiguienteConsecutivo () {
            var nuevoConsecutivo = consecutivo + 1;
            setConsecutivo(nuevoConsecutivo);
            return nuevoConsecutivo;
        }

        function updateSession() {
            sessionService.setVariable("showSideBar", false);
            var tienda =  getTiendaActiva();  
            if (tienda){
                sessionService.setVariable("tiendaNombre", tienda.nombre);                
                if(tienda.info && tienda.info.abierto){
                    sessionService.setVariable("showSideBar", true);
                }
            }
        }

        function clearTiendaActiva(){
            tiendaActiva = null;
        }

    }
})();
 

