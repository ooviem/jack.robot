var Cylon = require('cylon');

Cylon.api('http', {
  ssl: false // serve unsecured, over HTTP
  // optional configuration here.
  // for details see 'Configuration' section.
});

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
            this.runFowardPin.digitalWrite(0);
            this.runBackwardPin.digitalWrite(1);
          },
          runBackward : function() {
            this.runFowardPin.digitalWrite(1);
            this.runBackwardPin.digitalWrite(0);
          },
          stop : function() {
            this.runFowardPin.digitalWrite(0);
            this.runBackwardPin.digitalWrite(0);
          }
        },
        runFoward: function(){
          this.leftEngine.runFoward();
          this.rightEngine.runFoward();
        },
        runBackward: function(){
          this.leftEngine.runBackward();
          this.rightEngine.runBackward();
        },
        stop: function(){
          this.leftEngine.stop();
          this.rightEngine.stop();
        },
        turnLeft: function(){
          this.leftEngine.runBackward();
          this.rightEngine.runFoward();
        },
        turnRight: function(){
          this.leftEngine.runFoward();
          this.rightEngine.runBackward();
        }
      }
    };
    
    jack.runFoward = function(){
      jack.physical.foot.runFoward();
      after((2).seconds(), jack.stop);
    };

    jack.stop =function(){
      jack.physical.foot.stop();
    };
    jack.runFoward();
  }
}).start();


