function foot(data) {
    this.leftEngine = {
        runForward: function() {
            console.log("Left engine forward");
            data.runForwardPinLeft.digitalWrite(1);
            data.runBackwardPinLeft.digitalWrite(0);
        },
        runBackward: function() {
            console.log("Left engine backward");
            data.runForwardPinLeft.digitalWrite(0);
            data.runBackwardPinLeft.digitalWrite(1);
        },
        stop: function() {
            console.log("Left engine stop");
            data.runForwardPinLeft.digitalWrite(0);
            data.runBackwardPinLeft.digitalWrite(0);
        }
    };
    this.rightEngine = {
        runForward: function() {
            console.log("Right engine forward");
            data.runForwardPinRight.digitalWrite(1);
            data.runBackwardPinRight.digitalWrite(0);
        },
        runBackward: function() {
            console.log("Right engine backward");

            data.runForwardPinRight.digitalWrite(0);
            data.runBackwardPinRight.digitalWrite(1);
        },
        stop: function() {
            console.log("Right engine stop");
            data.runForwardPinRight.digitalWrite(0);
            data.runBackwardPinRight.digitalWrite(0);
        }
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
        this.leftEngine.stop();
        this.rightEngine.stop();
        console.log("Foot stopped");

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

function body(data) {
    this.foot = new foot({
        runForwardPinLeft: data.foot.runForwardPinLeft,
        runBackwardPinLeft: data.foot.runBackwardPinLeft,
        runForwardPinRight: data.foot.runForwardPinRight,
        runBackwardPinRight: data.foot.runBackwardPinRight
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
        after((0.5).second(), this.body.foot.stop);
    },
    runBackward: function() {
        this.body.foot.runBackward();
        after((0.5).second(), this.body.foot.stop);
    },
    turnLeft: function() {
        this.body.foot.turnLeft();
        after((0.5).second(), this.body.foot.stop);

    },
    turnRight: function() {
        this.body.foot.turnRight();
        after((0.5).second(), this.body.foot.stop);
    },
    stop: function() {
        this.body.foot.stop();
    }


}).start();