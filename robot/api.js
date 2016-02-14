 module.exports = function(jack) {
     return {
         runForward: function(duration, speed) {
             console.log(duration);
             if (speed !== undefined)
                 jack.body.foot.runForward(speed);
             if (duration)
                 after((parseFloat(duration)).second(), jack.stop);
         },

         runBackward: function(duration, speed) {
             if (speed !== undefined)
                 jack.body.foot.runBackward(speed);
             if (duration)
                 after((parseFloat(duration)).second(), jack.stop);
         },

         turnLeft: function(duration, speed) {
             if (speed !== undefined)
                 jack.body.foot.turnLeft(speed);
             if (duration)
                 after((parseFloat(duration)).second(), jack.stop);
         },

         turnRight: function(duration, speed) {
             if (speed !== undefined)
                 jack.body.foot.turnRight(speed);
             if (duration)
                 after((parseFloat(duration)).second(), jack.stop);
         },

         stop: function() {
             jack.body.foot.stop();
         },

         test: function(speed) {
             jack.body.foot.runForward(parseFloat(speed));
         }

     };
 };
