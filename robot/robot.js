var Cylon = require('cylon');

Cylon.api('http');

Cylon.robot({
  connections: {
    raspi: { adaptor: 'raspi' },
    loopback: { adaptor: 'loopback' }
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
            this.runFowardPin.digitalWrite(1);
            this.runBackwardPin.digitalWrite(0);
            console.log(this);
          },
          runBackward : function() {
            this.runFowardPin.digitalWrite(0);
            this.runBackwardPin.digitalWrite(1);
          },
          stop : function() {
            this.runFowardPin.digitalWrite(0);
            this.runBackwardPin.digitalWrite(0);
          }
        },
        rightEngine: {
          runFowardPin: jack.pin19,
          runBackwardPin: jack.pin21,
          runFoward : function() {
            this.runFowardPin.digitalWrite(1);
            this.runBackwardPin.digitalWrite(0);
          },
          runBackward : function() {
            this.runFowardPin.digitalWrite(0);
            this.runBackwardPin.digitalWrite(1);
          },
          stop : function() {
            this.runFowardPin.digitalWrite(0);
            this.runBackwardPin.digitalWrite(0);
          }
        }
      }
    };
    jack.physical.foot.rightEngine.runFoward();
    

    after((3).seconds(), function() {
      jack.physical.foot.rightEngine.stop();
    });
    jack.ping = function(){
      return "hello";
    };
  }
}).start();


