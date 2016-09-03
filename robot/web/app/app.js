angular.module('JackControllerApp', ['ngMaterial'])
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
                callGET("runForward");
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
            ctrlMe.speak = function(words) {
                callPOST("speak", { text: words});
            };

            ctrlMe.headLeft = function() {
                callGET("headLeft");
            };
            ctrlMe.headRight = function() {
                callGET("headRight");
            };
            ctrlMe.headUp = function() {
                callGET("headUp");
            };
            ctrlMe.headDown = function() {
                callGET("headDown");
            };

            ctrlMe.headMove = function(position) {
                callPOST("headMove", { position: position});
            };
            ctrlMe.headTurn = function(position) {
                callPOST("headTurn", { position: position});
            };

            ctrlMe.test = function() {
                callGET("test");
            };
        }
    ]);