"use strict"

var Cylon = require("cylon");

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

  work: function(my) {
    my.pin11.digitalWrite(0);
    my.pin13.digitalWrite(1);
    // my.pin19.digitalWrite(0);
    // my.pin21.digitalWrite(1);

    my.pin11.digitalWrite(0);
    my.pin13.digitalWrite(1);
    // my.pin19.digitalWrite(0);
    // my.pin21.digitalWrite(1);

  }
}).start();