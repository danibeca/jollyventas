'use strict';

angular.module('jollyVentasApp.login.services', [])
.factory('AuthenticationService',
    ['$http', '$cookieStore', '$rootScope', '$timeout', 'StorageService',
    function ($http, $cookieStore, $rootScope, $timeout, StorageService) {
        var service = {};
 
        service.login = function (username, password, callback) {
 
            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            $timeout(function(){
                var response = { "valido": username === 'test' && password === 'test',
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
                callback(response);
            }, 1000); 
 
            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        
            //        callback(response);
            //    });
 
        };

        service.setCredentials = function (user) {
            $rootScope.user = user;
            $cookieStore.put('user', $rootScope.user);
            StorageService.asignarVariableLocalStorage('user', JSON.stringify($rootScope.user));
        };
  
  
        service.clearCredentials = function () {
            $rootScope.user = {};  
            $cookieStore.remove('user');          
            StorageService.eliminarVariableLocalStorage('user');
        };
  
        return service;
    }]);