var Cylon = require("cylon");

Cylon.robot({
  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
    pin11: { driver: 'direct-pin', pin: 11 },
    pin13: { driver: 'direct-pin', pin: 13 },
    pin15: { driver: 'direct-pin', pin: 15 },
    pin19: { driver: 'direct-pin', pin: 19 }


  },

  work: function(my) {
    every((1).second(), function() {
      my.pin11.digitalWrite(1);
      my.pin13.digitalWrite(0);
      my.pin15.digitalWrite(1);
      my.pin19.digitalWrite(0);
    });

  }
}).start();