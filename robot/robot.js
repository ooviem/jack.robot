var Cylon = require('cylon');
var WebServer = require("./web/server.js");
var Body = require("./model/body.js");
var APICommand = require("./api.js");

WebServer.initWebServer();

Cylon.api('http', {
    ssl: false, // serve unsecured, over HTTP
    // optional configuration here.
    host: "0.0.0.0",
    port: "3000",
    // for details see 'Configuration' section.
});

var Jack = Cylon.robot({
    name: "Jack",
    connections: {
        raspi: {
            adaptor: 'raspi'
        },
        loopback: {
            adaptor: 'loopback'
        }
    },

    devices: {
        pin1: {
            driver: 'direct-pin',
            pin: 21
        },
        pin2: {
            driver: 'direct-pin',
            pin: 22
        },
        pin3: {
            driver: 'direct-pin',
            pin: 23
        },
        pin4: {
            driver: 'direct-pin',
            pin: 24
        }

    },

    work: function(jack) {
        this.pin1.digitalWrite(0);
        this.pin2.digitalWrite(0);
        this.pin3.digitalWrite(0);
        this.pin4.digitalWrite(0);
        this.body = new Body({
            foot: {
                runForwardPinLeft: this.pin1,
                runBackwardPinLeft: this.pin2,
                runForwardPinRight: this.pin3,
                runBackwardPinRight: this.pin4
            }
        });
        this.commands = APICommand(this);
    }
}).start();