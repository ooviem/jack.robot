var Cylon = require('cylon');

Cylon.api('http', {
  ssl: false // serve unsecured, over HTTP
  // optional configuration here.
  // for details see 'Configuration' section.
});

Cylon.robot({
  name: "Jack",
  connections: {
    loopback: { adaptor: 'loopback' }
  },

  devices: {
   
  },
  "commands":{
    ping: function() {
      return Cylon.robots;
    }
  },
  work: function(jack) {
   jack.a = "123";
  }

}).start();


