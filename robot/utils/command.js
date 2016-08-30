
var cp = require("child_process");
var Q = require("q");

var Command = {
    exe: function (command) {
        var deferred = Q.defer();
        console.log(command);
        var spawn = cp.spawn;
        var ls = spawn('flile', ['-voice','RMS', command]);

        ls.stdout.on('data', function (data)  {
            console.log('data'+data);
        });

        ls.stderr.on('data', function (data) {
          console.log('stderr'+data);
        });

        ls.on('close', function (code) {
          console.log('child process exited with code'+ code);
        });
        // cp.exec(command, function (error, stdout, stderr) {
        //   if (error) {
        //     console.error('exec error: ${error}');
        //     return;
        //   }
        //   console.log('stdout:'+stdout);
        //   console.log('stderr:'+stderr);
        // });
        // cp.exec(command, function (error, stdout, stderr) {
        //     var output = {
        //         error: error,
        //         stderr: stderr,
        //         stdout: stdout
        //     };
        //     deferred.resolve(output);
        // });

        return deferred.promise;
    },
    speak: function(text){
        var command = "flite -voice RMS '"+ text +"'";
        this.exe(text);
    },
    recordAudio: function(time){

    }
};
module.exports = Command;
