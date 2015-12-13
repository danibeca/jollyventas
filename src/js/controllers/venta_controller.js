angular.module('JollyVentasApp.controllers.Venta', [])

.controller('VentaController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {

    	$scope.cantidad = 0;
    	$scope.total = 0;
    	$rootScope.vistaPie = 'pie-venta.html';

    	$scope.articulo_agregar = function(){
    		var nuevo_valor = $scope.cantidad + 1;
			$scope.cantidad = nuevo_valor;
			$scope.total = $scope.total+1000;
    	}
    	$scope.articulo_remover = function(){
    		if($scope.cantidad > 0){
	    		var nuevo_valor = $scope.cantidad - 1;
	    		$scope.total = $scope.total-1000;
				$scope.cantidad = nuevo_valor;
    		}
    	}
    }]);
