angular.module('JollyVentasApp.controllers.Venta', [])

.controller('VentaController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {

    	$scope.cantidad = 0;

    	$scope.articulo_agregar = function(){
    		var nuevo_valor = $scope.cantidad + 1;
			$scope.cantidad = nuevo_valor;
    	}
    	$scope.articulo_remover = function(){
    		if($scope.cantidad > 0){
	    		var nuevo_valor = $scope.cantidad - 1;
				$scope.cantidad = nuevo_valor;
    		}
    	}
    }]);
