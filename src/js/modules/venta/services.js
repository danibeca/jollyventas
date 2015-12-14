'use strict';

angular.module('jollyVentasApp.venta.services', [])
.factory('VentaService',
    ['$http', '$cookieStore', '$rootScope', '$timeout',
    function ($http, $cookieStore, $rootScope, $timeout) {
        var service = {};
 
        service.Articles = function (almacen, callback) {
 
            $timeout(function(){
                var response = {};
                callback(response);
            }, 1000); 
        };
        return service;
    }]);