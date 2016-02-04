var Cylon = require('cylon');

Cylon.robot({
  connections: {
    arduino: { adaptor: 'raspi' }
  },

  devices: {
    pin11: { driver: 'direct-pin', pin: 11 },
    pin13: { driver: 'direct-pin', pin: 13 },
    pin19: { driver: 'direct-pin', pin: 19 },
    pin21: { driver: 'direct-pin', pin: 21 }

  },

  work: function(jack) {
    jack.physical = {
      foot : {
        leftEngine: {
          runFowardPin: jack.pin11,
          runBackwardPin: jack.pin13,
          runFoward : function() {
            runFowardPin = jack.physical.foot.leftEngine.runFowardPin;
            runBackwardPin = jack.physical.foot.leftEngine.runBackwardPin;
            runFowardPin.digitalWrite(1);
            runBackwardPin.digitalWrite(0);
            console.log(this);
          },
          runBackward : function() {
            runFowardPin = jack.physical.foot.leftEngine.runFowardPin;
            runBackwardPin = jack.physical.foot.leftEngine.runBackwardPin;
            runFowardPin.digitalWrite(0);
            runBackwardPin.digitalWrite(1);
          },
          stop : function() {
            runFowardPin = jack.physical.foot.leftEngine.runFowardPin;
            runBackwardPin = jack.physical.foot.leftEngine.runBackwardPin;
            runFowardPin.digitalWrite(0);
            runBackwardPin.digitalWrite(0);
          }
        },
        rightEngine: {
          runFowardPin: jack.pin19,
          runBackwardPin: jack.pin21,
          runFoward : function() {
            runFowardPin = jack.physical.foot.rightEngine.runFowardPin;
            runBackwardPin = jack.physical.foot.rightEngine.runBackwardPin;
            runFowardPin.digitalWrite(1);
            runBackwardPin.digitalWrite(0);
          },
          runBackward : function() {
            runFowardPin = jack.physical.foot.rightEngine.runFowardPin;
            runBackwardPin = jack.physical.foot.rightEngine.runBackwardPin;
            runFowardPin.digitalWrite(0);
            runBackwardPin.digitalWrite(1);
          },
          stop : function() {
            runFowardPin = jack.physical.foot.rightEngine.runFowardPin;
            runBackwardPin = jack.physical.foot.rightEngine.runBackwardPin;
            runFowardPin.digitalWrite(0);
            runBackwardPin.digitalWrite(0);
          }
        }
      }
    };
    jack.physical.foot.leftEngine.runFoward();
    

    after((3).seconds(), function() {
      jack.physical.foot.leftEngine.stop();
      // my.pin19.digitalWrite(0);
      // my.pin21.digitalWrite(0);
    });
   
  }
}).start();


