var Cylon = require("cylon");

Cylon.robot({
  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
    motorA1: { driver: 'direct-pin', pin: 35 },
    motorA2: { driver: 'direct-pin', pin: 36 },
    motorB1: { driver: 'direct-pin', pin: 37 },
    motorB2: { driver: 'direct-pin', pin: 38 }


  },

  work: function(my) {
    every((1).second(), function() {
      my.motorA1.digitalWrite(1);
      my.motorB1.digitalWrite(1);
    });

  }
}).start();