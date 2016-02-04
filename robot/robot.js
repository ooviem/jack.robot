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
          runFowardPin: jack.pin13,
          runBackwardPin: jack.pin11,
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
          runFowardPin: jack.pin21,
          runBackwardPin: jack.pin19,
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
      after((1).seconds(), jack.stop);
    };

    jack.runBackward = function(){
      jack.physical.foot.runBackward();
      after((1).seconds(), jack.stop);
    };

    jack.turnLeft = function(){
      jack.physical.foot.turnLeft();
      after((1).seconds(), jack.stop);
    };

    jack.turnRight = function(){
      jack.physical.foot.turnRight();
      after((1).seconds(), jack.stop);
    };

    jack.stop =function(){
      jack.physical.foot.stop();
    };

    jack.runFoward();
    after((2).seconds(), jack.runBackward);
    after((2).seconds(), jack.turnLeft);
    after((2).seconds(), jack.turnRight);

  }
}).start();


