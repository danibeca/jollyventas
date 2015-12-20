(function() {
    'use strict';

    angular
        .module('app.usuario')
        .controller('Login', Login);


    ////////////////////////////////////////////////////////////////////////////////
    /* @ngInject */
    function Login($rootScope, locationService, usuarioService) {            
        var vm = this;
        
        vm.dataLoading = false;
        vm.login = login;
        
        function login() {
            vm.dataLoading = true;
            usuarioService.getLogin(vm.credential)             
                                 .then(getLoginComplete);

            function getLoginComplete(data, status, headers, config) {               
                vm.dataLoading = false;
                if(data.valido) {
                    $rootScope.usuarioNombre = data.persona.nombre ;
                    usuarioService.setUsuarioActivo(data);
                    locationService.updateCurrentLocation('/tienda-seleccionar');                
                } else {
                    vm.error = data.message;                    
                }
            }
        }
    }
})();