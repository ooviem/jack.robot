
var cp = require("child_process");
var Q = require("q");

var Command = {
   
    execute: function (command) {
        var deferred = q.defer();
        console.log(fullCommand);
        cp.exec(fullCommand, function (error, stdout, stderr) {
            var output = {
                error: error,
                stderr: stderr
            };
            deferred.resolve(output);
        });
        return deferred.promise;
    },
    speak: function(text){
        this.execute("flite -voice RMS '"+ text +"'");
    },
    recordAudio: function(time){

    }



};
module.exports = Command;
