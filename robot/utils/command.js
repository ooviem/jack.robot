
var cp = require("child_process");
var Q = require("q");

var Command = {
    exe: function (command) {
        var deferred = Q.defer();
        console.log(command);
        cp.exec(command, function (error, stdout, stderr) {
            var output = {
                error: error,
                stderr: stderr,
                stdout: stdout
            };
            deferred.resolve(output);
        });

        return deferred.promise;
    },
    speak: function(text){
        var command = "sudo flite -voice RMS '"+ text +"'";
        this.exe(command).then(function(data){
            console.log(data);
        });
    },
    recordAudio: function(time){

    }
};
module.exports = Command;
