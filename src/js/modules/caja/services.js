(function() {
    'use strict';

    angular
        .module('app.caja')
        .factory('cajaService', cajaService);

    /* @ngInject */
    function cajaService($http, storageService, mockService) {        
        
        var cajaActual;
        
        var service = {
            getCaja: getCaja,
            setCajaActual: setCajaActual, 
            getCajaActual: setCajaActual,  
        };
        return service;
          
        //////////////////////////////////////////////////////

        function getCaja(token, idTienda) {

            return mockService.getCaja()             
          //return $http.get('server/caja/', getRequestJson)
                .then(getCajaComplete)
                .catch(getCajaFailed);

            function getCajaComplete(data, status, headers, config) {               
                return data;
            }

            function getCajaFailed(error) {
                console.log('getCajaFailed XHR Failed for' + error.data);                
            }
            function getRequestJson() {
                return  '{}';           
            }
        }

        function setCajaActual(data) {
            cajaActual = data;
            storageService.setJsonObject('caja', data);
        }

        function getCajaActual() {
             if(!cajaActual){
                cajaActual = storageService.getJsonObject('caja');
             }
             return cajaActual;  
        }
          
    }
})();
 

