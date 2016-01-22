(function() {
    'use strict';
    
    angular
        .module('app.venta')
        .factory('productoService', productoService);
    
    /* @ngInject */
    
    function productoService($http, sessionService, storageService , mockService) {
        
        var service = {
            getProductos: getProductos
        };
        return service;
        
        //////////////////////////////////////////////////////
        function getProductos() {
            
            return      [  {   "nombre" :  "cherry",
                                "prod" :    {   "nueve" : {"id": 101, "cantidad": 0, "disponible": false}, 
                                                "doce" : {"id": 102, "cantidad": 0, "disponible": false}
                                            },
                                "disponible" : false
                            },
                            {   "nombre" : "apple",
                                "prod" :    {   "nueve" : {"id": 201, "cantidad": 0, "disponible": false}, 
                                                "doce" : {"id": 202, "cantidad": 0, "disponible": false}
                                            },
                                "disponible" : false
                            },
                            {   "nombre" : "hersheys",
                                "prod" :    {   "nueve" : {"id": 301, "cantidad": 0, "disponible": false}, 
                                                "doce" : {"id": 302, "cantidad": 0, "disponible": false}
                                            },
                                "disponible" : false
                            },
                            {   "nombre" : "watermelon",
                                "prod" :    {   "nueve" : {"id": 401, "cantidad": 0, "disponible": false}, 
                                                "doce" : {"id": 402, "cantidad": 0, "disponible": false}
                                            },
                                "disponible" : false
                            },
                            {   "nombre" : "blue",
                                "prod" :    {   "nueve" : {"id": 501, "cantidad": 0, "disponible": false}, 
                                                "doce" : {"id": 502, "cantidad": 0, "disponible": false}
                                            },
                                "disponible" : false
                            },
                            {   "nombre" : "grape",
                                "prod" :    {   "nueve" : {"id": 601, "cantidad": 0, "disponible": false}, 
                                                "doce" : {"id": 602, "cantidad": 0, "disponible": false}
                                            },
                                "disponible" : false
                            }
                        ];
            
        };
    }
})();