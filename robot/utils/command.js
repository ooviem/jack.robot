
var cp = require("child_process");
var Q = require("q");

var Command = {
    exe: function (command) {
        console.log(command);
        cp.exec(command, function (error, stdout, stderr) {
            var output = {
                error: error,
                stderr: stderr
            };
        });
    },
    speak: function(text){
        var command = "flite -voice RMS '"+ text +"'";
        this.exe(command);
    },
    recordAudio: function(time){

    }
};
module.exports = Command;
