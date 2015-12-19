(function() {
    'use strict';

    angular
        .module('app.usuario')
        .controller('Login', Login);


    ////////////////////////////////////////////////////////////////////////////////
    /* @ngInject */
    function Login($rootScope, $location, usuarioService) {            
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
                    $location.path('/tienda-seleccionar');                
                } else {
                    vm.error = data.message;                    
                }
            }
        }
    }
})();