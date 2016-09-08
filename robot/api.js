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
            jack.body.runWithDistanceFake();
         },

         test2: function() {
            this.voice();
         },
        

        voice: function(){
             console.log("Start recorded");

             var proc = cp.exec("arecord -d 4 voice.wav -D sysdefault:CARD=1", function (error, stdout, stderr) {
                console.log("Recorded");
                var data;
                if (error) {
                    console.error('exec error:'+error);
                }
                var output = {
                    error: error,
                    stderr: stderr,
                    stdout: stdout
                };
                var options = {
                    host: "api.wit.ai",
                    path: '/speech?v=20160830',
                    method: "POST",
                    headers: {
                        "Content-Type": "audio/wav",
                        "Authorization": "Bearer AYYU7KS2YDO35YUKOACFQJNDR4LLWQEG"
                    }
                };
                var audio = fs.readFileSync("./voice.wav");

                var req = http.request(options, function(res) {
                      res.on('data', function (chunk) {
                        data = JSON.parse(chunk);
                        console.log('BODY: ' + chunk);
                        console.log('text: ' + data["_text"]);

                        if(data["_text"] === "turn left") {
                            console.log("turn left voice command");
                            jack.body.foot.turnLeft();
                            after(0.9, function(){
                                jack.body.foot.stop();
                            }); } 
                        else if(data["_text"] === "turn right"){
                            console.log("turn right voice command");
                            jack.body.foot.turnRight();
                            after(0.9, function(){
                                jack.body.foot.stop();
                            }); 
                        } else if(data["_text"] === "what do you see"){

                        }
                      });
                      res.on('end', function () {
                      });
                });
                req.write(audio);
                req.end();
             });
        },
        detectObject: function(){
            console.log("Start recorded");
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
                  res.on('data', function (chunk) {
                    console.log('BODY: ' + chunk);
                    data = JSON.parse(chunk);
                    jack.body.mouth.speak(data.description.captions[0].text);
                  });
                });

                req.write(image);
                req.end();

            });
           
         },

         

     };
 };
