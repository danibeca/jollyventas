'use strict';

angular.module('jollyVentasApp.general.services', [])
.factory('StorageService',
    ['$http', '$cookieStore', '$rootScope', '$timeout',
    function ($http, $cookieStore, $rootScope, $timeout) {
        var service = {};
 
        service.obtenerVariableLocalStorage = function (sNombreVariable) {
            return localStorage.getItem(sNombreVariable);
        };
        
        service.asignarVariableLocalStorage = function (sNombreVariable, Valor){
            localStorage.setItem(sNombreVariable, Valor);
        };
        
        service.eliminarVariableLocalStorage = function (sNombreVariable){
            window.localStorage.removeItem(sNombreVariable);
        };
        
        service.eliminarLocalStorage = function (){
            window.localStorage.clear();
        };
        
        return service;
    }]);
