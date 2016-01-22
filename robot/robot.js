var Cylon = require("cylon");

Cylon.robot({
  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
    led: { driver: 'led', pin: 7 },
    led1: { driver: 'led', pin: 11 },
    led2: { driver: 'led', pin: 13 },
    led3: { driver: 'led', pin: 15 },


  },

  work: function(my) {
    every((1).second(), my.led.toggle);
    every((1).second(), my.led1.toggle);
    every((1).second(), my.led2.toggle);
    every((1).second(), my.led3.toggle);

  }
}).start();