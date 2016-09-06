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
            // var read = jack.body.head.ultrasonic.read();
            // read.then(function (data) {
            //     distance = data.stderr;
            //     console.log(distance);
            // });
            jack.body.head.move(560);
            jack.body.head.turn(410);
            
            var read = jack.body.head.ultrasonic.read();
            read.then(function (data) {
                distance = data.stderr;
                console.log(distance);
            });
         },

         test2: function(){
            // jack.body.runWithDistance(1);
            jack.body.head.move(560);
            jack.body.head.turn(410);

            var read = jack.body.head.ultrasonic.read();
            read.then(function (data) {
                distance = data.stderr;
                console.log(distance);
            });
         },

     };
 };
