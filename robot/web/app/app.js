angular.module('JackControllerApp', ['ngMaterial'])
    .controller('JackController', ['$http', 
    	function($http) {
            function callGet(url, data) {
                return $http({
                    method: 'GET',
                    data: {
                        "time" : data.time
                    },
                    url: 'http://192.168.1.99:3000/api/robots/Jack/commands/' + url
                });
            }
            var ctrlMe = this;
            ctrlMe.runForward = function() {
                callGet("runForward", {"time": 2});
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