var Cylon = require('cylon');
var WebServer = require("./web/server.js");
var Body = require("./model/body.js");

webServer.initWebServer();

Cylon.api('http', {
    ssl: false, // serve unsecured, over HTTP
    // optional configuration here.
    host: "0.0.0.0",
    port: "3000",
    // for details see 'Configuration' section.
});

Cylon.robot({
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
        this.pin11.digitalWrite(0);
        this.pin13.digitalWrite(0);
        this.pin19.digitalWrite(0);
        this.pin21.digitalWrite(0);
        this.body = new Body({
            foot: {
                runForwardPinLeft: this.pin13,
                runBackwardPinLeft: this.pin11,
                runForwardPinRight: this.pin21,
                runBackwardPinRight: this.pin19
            }
        });
    },

    runForward: function() {
        this.body.foot.runForward();
        after((0.5).second(), this.stop);
    },
    runBackward: function() {
        this.body.foot.runBackward();
        after((0.5).second(), this.stop);
    },
    turnLeft: function() {
        this.body.foot.turnLeft();
        after((0.2).second(), this.stop);

    },
    turnRight: function() {
        this.body.foot.turnRight();
        after((0.2).second(), this.stop);
    },
    stop: function() {
        this.body.foot.stop();
    }


}).start();