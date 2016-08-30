
var cp = require("child_process");
var Q = require("q");

var Command = {
   
    execute: function (command) {
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
        console.log(command);
        this.execute(command);
    },
    recordAudio: function(time){

    }



};
module.exports = Command;
