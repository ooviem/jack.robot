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
            jack.body.foot.turnLeft();
            every((3).seconds(), function() {
                jack.body.foot.stop();
            });
             // jack.body.mouth.speak("I am Jack");
             // jack.body.runWithDistance();
         },

     };
 };
