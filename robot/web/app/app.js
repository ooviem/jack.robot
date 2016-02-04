angular.module('JackControllerApp', ['ngMaterial'])
    .controller('JackController', ['$http', 
    	function($http) {
            function callGet(url) {
                return $http({
                    method: 'GET',
                    url: 'http://192.168.1.99:3000/api/robots/Jack/commands/' + url
                });
            }
            var ctrlMe = this;
            ctrlMe.runForward = function() {
                callGet("runForward");
            };
            ctrlMe.runBackward = function() {
                callGet("runBackward");
            };
            ctrlMe.turnLeft = function() {
                callGet("turnLeft");
            };
            ctrlMe.turnRight = function() {
                callGet("turnRight");
            };
        }
    ]);