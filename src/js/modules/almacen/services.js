(function() {
    'use strict';

    angular
        .module('app.almacen')
        .factory('almacenService', almacenService);

    /* @ngInject */
    function almacenService($http, storageService, mockService) {
        
        var almacenActual;
        
        var service = {
            getAlmacen: getAlmacen,
            setAlmacenActual: setAlmacenActual, 
            getAlmacenActual: getAlmacenActual
        };
        return service;
          
        //////////////////////////////////////////////////////

        function getAlmacen(token, idTienda) {

            return mockService.getAlmacen()             
          //return $http.get('server/almacen/', getRequestJson)
                .then(getAlmacenComplete)
                .catch(getAlmacenFailed);

            function getAlmacenComplete(data, status, headers, config) {               
                return data;
            }

            function getAlmacenFailed(error) {
                console.log('getAlmacenFailed XHR Failed for' + error.data);                
            }
            function getRequestJson() {
                return  '{}';           
            }
        }

        function setAlmacenActual(data) {
            almacenActual = data;
            storageService.setJsonObject('almacen', data);
        }

        function getAlmacenActual() {
            if(!almacenActual){
                almacenActual = storageService.getJsonObject('almacen');
            }
            return almacenActual;  
        }         
    }
})();
 

