(function() {
    'use strict';

    angular
        .module('app.general')
        .factory('storageService', storageService);


    /* @ngInject */
    function storageService() {
        var service = {
            obtenerVariableLocalStorage: obtenerVariableLocalStorage,
            asignarVariableLocalStorage: asignarVariableLocalStorage,
            eliminarVariableLocalStorage: eliminarVariableLocalStorage,
            clear: clear,
            getJsonObject: getJsonObject,
            setJsonObject: setJsonObject,
        };

        return service;
        
        ///////////////////////////////////////////////////////////////////

        function obtenerVariableLocalStorage(sNombreVariable) {
            return localStorage.getItem(sNombreVariable);
        }
        
        function asignarVariableLocalStorage(sNombreVariable, Valor){
            localStorage.setItem(sNombreVariable, Valor);
        }
        
        function eliminarVariableLocalStorage(sNombreVariable){
            window.localStorage.removeItem(sNombreVariable);
        }
        
        function clear(){
            window.localStorage.clear();
        }

        function getJsonObject(sNombreVariable) {
            return JSON.parse(localStorage.getItem(sNombreVariable));
        }

        function setJsonObject(sNombreVariable, valor){
            localStorage.setItem(sNombreVariable, JSON.stringify(valor));
        }
    }
})();
        

