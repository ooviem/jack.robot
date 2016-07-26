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
        },
        speech: { adaptor: 'speech' }

    },

    devices: {
        pin1: {
            driver: 'direct-pin',
            pin: 13
        },

        pin2: {
            driver: 'direct-pin',
            pin: 15
        },

        pin3: {
            driver: 'direct-pin',
            pin: 16
        },

        pin4: {
            driver: 'direct-pin',
            pin: 18
        },

        audioOutput: { 
            driver: "speech"
            language: "english",
            gender: "f",
            variant: "3",
            speed: 130
        }
    },

    work: function(jack) {
        this.pin1.digitalWrite(0);
        this.pin2.digitalWrite(0);
        this.pin3.digitalWrite(0);
        this.pin4.digitalWrite(0);
        this.body = new Body({
            foot: {
                runForwardPinLeft: this.pin3,
                runBackwardPinLeft: this.pin4,
                runForwardPinRight: this.pin1,
                runBackwardPinRight: this.pin2
            },
            mouth: this.audioOutput
        });
        this.commands = APICommand(this);
    }
}).start();