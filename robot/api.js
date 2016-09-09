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
            jack.body.runWithDistance(30);
         },
         
         hello: function() {
            jack.body.mouth.speak("Hello there, I am , Jack. Welcome to KMS Technology, Tech Con, 2016. I am made by, Viem Ong. I can speak. Moving without impact anything. Know what are you doing and hear what are you talking. Have a nice day.");
         },

         record: function() {
            jack.body.mouth.speak("What do you want to do? sir");
            after((3).second(), function(){
                jack.body.mouth.speak("Okay sir");
                after((1).second(), function(){
                    jack.body.mouth.speak("One  ");
                    after((1).second(), function(){
                        jack.body.mouth.speak("Two  ");
                        after((1).second(), function(){
                            jack.body.mouth.speak("Three ");
                            after((1).second(), function(){
                                jack.body.mouth.speak("Say cheese ");
                                command.captureHighQuality();
                            }); 
                        }); 
                    });  
                });  
            }); 
           
         },

        voice: function(){
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
            jack.body.mouth.speak("What do you want to do? sir");
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
                    console.log(data.description.captions[0].text);
                    jack.body.mouth.speak(data.description.captions[0].text);
                  });
                  res.on('error', function (chunk) {
                    jack.body.mouth.speak("Sorry I can not find anything, please try again");
                  });
                });

                req.write(image);
                req.end();

            });
           
         },

         

     };
 };
