'use strict';

angular.module('jollyVentasApp.general.services', [])
.factory('StorageService',
    ['$http', '$cookieStore', '$rootScope', '$timeout',
    function ($http, $cookieStore, $rootScope, $timeout) {
        var service = {};
 
        service.obtenerVariableLocalStorage = function (sNombreVariable) {
            return JSON.parse(localStorage.getItem(sNombreVariable));
        };
        
        service.asignarVariableLocalStorage = function (sNombreVariable, Valor){
            localStorage.setItem(sNombreVariable, JSON.stringify(Valor));
        };
        
        return service;
    }]);

/*

localstorage.asignarVariableLocalStorage = function (sNombreVariable, Valor){
    window.localStorage.setItem(sNombreVariable, Valor);
};

localstorage.eliminarVariableLocalStorage = function (sNombreVariable){
    window.localStorage.removeItem(sNombreVariable);
};

localstorage.eliminarLocalStorage = function (){
    window.localStorage.clear();
};
*/

