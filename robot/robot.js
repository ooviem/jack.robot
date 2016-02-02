var Cylon = require('cylon');

Cylon.robot({
  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
    servo: { driver: 'servo', pin: 11 }
  },

  work: function(my) {
    var angle = 30,
        increment = 40;
    every((1).seconds(), function() {
      angle += increment;
      my.servo.angle(angle);
      console.log("Current Angle: " + (my.servo.currentAngle()));

      if ((angle === 30) || (angle === 150)) { increment = -increment; }
    });
  }
}).start();