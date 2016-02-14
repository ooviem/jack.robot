angular.module('JackControllerApp', ['ngMaterial', 'ngTouch'])
    .controller('JackController', ['$http', 
    	function($http) {
            function callGET(url, data) {
                return $http({
                    method: 'GET',
                    url: 'http://192.168.1.99:3000/api/robots/Jack/commands/' + url
                });
            };
            function callPOST(url, data) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'http://192.168.1.99:3000/api/robots/Jack/commands/' + url
                });
            };
            var ctrlMe = this;

            ctrlMe.runForward = function() {
                callPOST("test", { speed: 0.5 });
            };
            ctrlMe.runBackward = function() {
                callGET("runBackward");
            };
            ctrlMe.turnLeft = function() {
                callGET("turnLeft");
            };
            ctrlMe.turnRight = function() {
                callGET("turnRight");
            };
            ctrlMe.stop = function() {
                callGET("stop");
            };

        }
    ]);