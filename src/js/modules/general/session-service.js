(function() {
    'use strict';

    angular
        .module('app.general')
        .factory('sessionService', sessionService);


    /* @ngInject */
    function sessionService($rootScope) {
        var variables = {};
        var service = {
            clear: clear,
            setVariable:setVariable,
            removeVariable:removeVariable
        };

        return service;
        
        ///////////////////////////////////////////////////////////////////
        
        function clear(){
            angular.forEach(variables, function(variable, key) {
                removeVariable(key);               
            });
        }

        function setVariable(key, value){
            variables[key] = value;
            $rootScope[key] = value;
        }

        function removeVariable(key){
            delete variables[key];
            delete $rootScope[key]; 
        }
    }
})();
        

