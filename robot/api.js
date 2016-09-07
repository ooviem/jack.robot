 var excution = require("./text-command.js");
 var command = require("./utils/command.js");
 var http = require('https');
 var fs = require('fs');
 var cp = require("child_process");

 module.exports = function(jack) {
     return {
         runForward: function(duration) {
             jack.body.foot.runForward();
             if (duration)
                 after((parseFloat(duration)).second(), jack.stop);
         },

         runBackward: function(duration) {
             jack.body.foot.runBackward();
             if (duration)
                 after((parseFloat(duration)).second(), jack.stop);
         },

         turnLeft: function() {
             jack.body.foot.turnLeft();
             if (duration)
                 after((parseFloat(duration)).second(), jack.stop);
         },

         turnRight: function() {
             jack.body.foot.turnRight();
             if (duration)
                 after((parseFloat(duration)).second(), jack.stop);
         },

         stop: function() {
             jack.body.foot.stop();
         },
                  
         speak: function(words) {
             jack.body.mouth.speak(words);
         },

         headLeft: function() {
             jack.body.head.turnLeft();
         },
         
         headRight: function() {
             jack.body.head.turnRight();
         },

         headUp: function() {
             jack.body.head.moveUp();
         },

         headDown: function() {
             jack.body.head.moveDown();
         },

         headMove: function(position) {
             position = parseInt(position);
             jack.body.head.move(position);
         },

         headTurn: function(position) {
             position = parseInt(position);
             jack.body.head.turn(position);
         },

         test: function(){
            jack.body.runWithDistance(10);
         },

         test2: function() {
            this.voice();
         },
        
        voice: function(){
             var process = cp.exec("arecord voice.wav -D sysdefault:CARD=1", function (error, stdout, stderr) {
                console.log("Recorded");

                if (error) {
                    console.error('exec error:'+error);
                }
                var output = {
                    error: error,
                    stderr: stderr,
                    stdout: stdout
                };
             });
             after(3, process.kill('SIGINT'));
        },
        detectObject: function(){
            command.captureImage().then(function(data){
                console.log("Photo taken"); 
                var options = {
                    host: "api.projectoxford.ai",
                     path: '/vision/v1.0/describe?maxCandidates=1',
                    method: "POST",
                    headers: {
                        "Content-Type": "application/octet-stream",
                        "Ocp-Apim-Subscription-Key": "97eb698885fe4d96a68e4cfcfdf89aeb"
                    }
                };
                var image = fs.readFileSync("./cam.jpg");

                var req = http.request(options, function(res) {
                  console.log('STATUS: ' + res.statusCode);
                  console.log('HEADERS: ' + JSON.stringify(res.headers));
                  res.on('data', function (chunk) {
                    console.log('BODY: ' + chunk);
                  });
                });

                req.write(image);
                req.end();

            });
           
            // command.captureImage().then(function(data){
            //     //The url we want is `www.nodejitsu.com:1337/`
            //     var options = {
            //       host: 'api.projectoxford.ai',
            //       path: '/vision/v1.0/describe?maxCandidates=1',
            //       //since we are listening on a custom port, we need to specify it by hand
            //       port: '443',
            //       //This is what changes the request to a POST request
            //       method: 'POST'
            //     };

            //     callback = function(response) {
            //       var str = ''
            //       response.on('data', function (chunk) {
            //         str += chunk;
            //       });

            //       response.on('end', function () {
            //         console.log(str);
            //       });
            //     }

            //     var req = http.request(options, callback);
            //     //This is the data we are posting, it needs to be a string or a buffer
            //     req.write("hello world!");
            //     req.end();
            // });
            // var read = jack.body.head.ultrasonic.read();
            // read.then(function (data) {
            //     distance = data.stderr;
            //     console.log(distance);
            // });
         },

         textCommand: function(cmd){
            excution[cmd]();
         }

     };
 };
