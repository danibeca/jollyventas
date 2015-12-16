'use strict';

angular.module('jollyVentasApp.venta.services', [])
.factory('VentaService',
    ['$http', '$rootScope', '$timeout',
    function ($http, $rootScope, $timeout) {
        var service = {};
 
        service.iniciarVista = function (producto_disponible) {
            // TODO: Traer lógica del controlador
        };
        return service;
    }]);