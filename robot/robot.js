var webServer = require("web/server.js");
function foot(hardwareIO) {
    this.leftEngine = {
        runForward: function() {
            console.log("Left engine forward");
            hardwareIO.runForwardPinLeft.digitalWrite(1);
            hardwareIO.runBackwardPinLeft.digitalWrite(0);
        },
        runBackward: function() {
            console.log("Left engine backward");
            hardwareIO.runForwardPinLeft.digitalWrite(0);
            hardwareIO.runBackwardPinLeft.digitalWrite(1);
        },
        stopEngine: function() {
            console.log("Left engine stop");
            hardwareIO.runForwardPinLeft.digitalWrite(0);
            hardwareIO.runBackwardPinLeft.digitalWrite(0);
        },
    };
    this.rightEngine = {
        runForward: function() {
            console.log("Right engine forward");
            hardwareIO.runForwardPinRight.digitalWrite(1);
            hardwareIO.runBackwardPinRight.digitalWrite(0);
        },
        runBackward: function() {
            console.log("Right engine backward");

            hardwareIO.runForwardPinRight.digitalWrite(0);
            hardwareIO.runBackwardPinRight.digitalWrite(1);
        },
        stopEngine: function() {
            console.log("Right engine stop");
            hardwareIO.runForwardPinRight.digitalWrite(0);
            hardwareIO.runBackwardPinRight.digitalWrite(0);
        },
    };
    this.runForward = function() {
        this.leftEngine.runForward();
        this.rightEngine.runForward();
        console.log("Foot running forward");
    };
    this.runBackward = function() {
        this.leftEngine.runBackward();
        this.rightEngine.runBackward();
        console.log("Foot running backward");
    };
    this.stop = function() {
        console.log(this);
        this.leftEngine.stopEngine();
        this.rightEngine.stopEngine();
    };
    this.turnLeft = function() {
        this.leftEngine.runBackward();
        this.rightEngine.runForward();
        console.log("Foot turn left");
    };
    this.turnRight = function() {
        this.leftEngine.runForward();
        this.rightEngine.runBackward();
        console.log("Foot turn right");
    };
};

function body(hardwareIO) {
    this.foot = new foot({
        runForwardPinLeft: hardwareIO.foot.runForwardPinLeft,
        runBackwardPinLeft: hardwareIO.foot.runBackwardPinLeft,
        runForwardPinRight: hardwareIO.foot.runForwardPinRight,
        runBackwardPinRight: hardwareIO.foot.runBackwardPinRight
    });
};


var Cylon = require('cylon');

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
        this.body = new body({
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