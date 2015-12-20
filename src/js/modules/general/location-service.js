(function() {
    'use strict';

    angular
        .module('app.general')
        .factory('locationService', locationService);


    /* @ngInject */
    function locationService($location, storageService) {
        var currentLocation = getCurrentLocation();
        var service = {
            verifyLocation: verifyLocation,
            updateCurrentLocation: updateCurrentLocation,            
            getCurrentLocation: getCurrentLocation
        };

        return service;
        
        ///////////////////////////////////////////////////////////////////
        
        function verifyLocation(){
            if ($location.path() !== currentLocation) {
                updateCurrentLocation(currentLocation);
            }
        }

        function updateCurrentLocation(path) {
            currentLocation = path;
            storageService.setJsonObject('currentLocation', currentLocation);
            $location.path(currentLocation);
        }

        function getCurrentLocation() {
            if(!currentLocation){
                currentLocation = storageService.getJsonObject('currentLocation');
                if(!currentLocation){
                    currentLocation = '/login';
                }
            }
            return currentLocation;  
        }
    }
})();
        

