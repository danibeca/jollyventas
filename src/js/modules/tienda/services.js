(function() {
    'use strict';

    angular
        .module('jollyVentasApp.tienda')
        .factory('tiendaService', tiendaService);

    /* @ngInject */
    function tiendaService($http, mockService) {        

      var service = {
          getList: getList           
      };
      return service;
      
      //////////////////////////

      function getList() {
        return mockService.getListTiendas()             
        //return $http.get('/api/maa')
          .then(getListComplete)
          .catch(getListFailed);

        function getListComplete(data, status, headers, config) {               
          return data;
        }

        function getListFailed(error) {
          console.log('XHR Failed for' + error.data);                
        }
      }    
    }
})();
 

