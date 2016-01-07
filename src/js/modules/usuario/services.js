(function() {
    'use strict';

    angular
        .module('app.usuario')
        .factory('usuarioService', usuarioService);

    /* @ngInject */
    function usuarioService($http, sessionService, storageService , mockService) {        
        var usuarioActivo;

        var service = {
            getLogin: getLogin,
            setUsuarioActivo: setUsuarioActivo,              
            getUsuarioActivo: getUsuarioActivo,
            updateSession: updateSession,              
        };
        return service;

        //////////////////////////////////////////////////////
        function getLogin(user) {

            return mockService.getLogin(user)             
          //return $http.get('server/user/login', getRequestJson)
                .then(getLoginomplete)
                .catch(getLoginFailed);

            function getLoginomplete(data, status, headers, config) {               
                return data;
            }

            function getLoginFailed(error) {
                console.log('getLoginFailed XHR Failed for' + error.data);                
            }

            function getRequestJson() {
                return  '{}';           
            }
        }

        function setUsuarioActivo(data) {
            usuarioActivo = data;
            storageService.setJsonObject('usuario', data);
        }

        function getUsuarioActivo() {
            if(!usuarioActivo){
                usuarioActivo = storageService.getJsonObject('usuario');
            }
            return usuarioActivo;  
        }

        function updateSession() {
            var usuario = getUsuarioActivo();
            if (usuario) {
                sessionService.setVariable("usuarioNombre", usuario.persona.nombre);                 
            }
        }


    }
})();

