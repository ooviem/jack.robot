
var cp = require("child_process");
var Q = require("q");

var Command = {
    exe: function (command) {
        console.log(fullCommand);
        cp.exec(fullCommand, function (error, stdout, stderr) {
            var output = {
                error: error,
                stderr: stderr
            };
        });
    },
    speak: function(text){
        var command = "flite -voice RMS '"+ text +"'";
        console.log(this);
        this.exe(command);
    },
    recordAudio: function(time){

    }
};
module.exports = Command;
