
var cp = require("child_process");
var Q = require("q");

var Command = {
    exe: function (command) {
        var deferred = Q.defer();
        cp.exec(command, function (error, stdout, stderr) {
            if (error) {
                console.error('exec error:'+error);
            }
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
        var command = "sudo runuser -l pi -c" + "\"flite -voice RMS '"+ text +"'\"";
        this.exe(command);
    },
    captureImage: function(time){
        return this.exe("raspistill -w 800 -h 600 -o cam.jpg");
    },
    readUltrasonic: function(){
        return this.exe("sudo python ./utils/dis.py");
    }
};
module.exports = Command;
