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
            adaptor: 'raspi',
            port: "/dev/ttyACMO"
        },
        loopback: {
            adaptor: 'loopback'
        }
    },

    devices: {
        pin11: {
            driver: 'direct-pin',
            pin: 11
        },
        pin13: {
            driver: 'direct-pin',
            pin: 13
        },
        pin19: {
            driver: 'direct-pin',
            pin: 19
        },
        pin21: {
            driver: 'direct-pin',
            pin: 21
        }

    },

    work: function(jack) {

        this.connections.raspi.pwmWrite(this.pin11, 1);

        this.body = new Body({
            foot: {
                runForwardPinLeft: this.pin13,
                runBackwardPinLeft: this.pin11,
                runForwardPinRight: this.pin21,
                runBackwardPinRight: this.pin19
            }
        });
        this.commands = APICommand(this);
    }
}).start();