angular.module('JackControllerApp', [])
	.controller('JackController', ['$http', function($http) {
        var ctrlMe = this;
        ctrlMe.goForward = function() {
            $http({
                method: 'GET',
                url: 'http://192.168.1.99:3000/api/robots/Jack/commands/runBackward'
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
    }]);