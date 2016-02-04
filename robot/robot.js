function foot(data) {
    this.leftEngine = {
        runFoward: function() {
            data.runFowardPinLeft.digitalWrite(1);
            data.runBackwardPinLeft.digitalWrite(0);
        },
        runBackward: function() {
            data.runFowardPinLeft.digitalWrite(0);
            data.runBackwardPinLeft.digitalWrite(1);
        },
        stop: function() {
            data.runFowardPinLeft.digitalWrite(0);
            data.runBackwardPinLeft.digitalWrite(0);
        }
    };
    this.rightEngine = {
        runFoward: function() {
            data.runFowardPinRight.digitalWrite(1);
            data.runBackwardPinRight.digitalWrite(0);
        },
        runBackward: function() {
            data.runFowardPinRight.digitalWrite(0);
            data.runBackwardPinRight.digitalWrite(1);
        },
        stop: function() {
            data.runFowardPinRight.digitalWrite(0);
            data.runBackwardPinRight.digitalWrite(0);
        }
    };
    this.runFoward = function() {
        this.leftEngine.runFoward();
        this.rightEngine.runFoward();
    };
    this.runBackward = function() {
        this.leftEngine.runBackward();
        this.rightEngine.runBackward();
    };
    this.stop = function() {
        this.leftEngine.stop();
        this.rightEngine.stop();
    };
    this.turnLeft = function() {
        this.leftEngine.runBackward();
        this.rightEngine.runFoward();
    };
    this.turnRight = function() {
        this.leftEngine.runFoward();
        this.rightEngine.runBackward();
    };
};

function body(data) {
    this.foot = new foot({
        runFowardPinLeft: data.foot.runFowardPinLeft,
        runBackwardPinLeft: data.foot.runBackwardPinLeft,
        runFowardPinRight: data.foot.runFowardPinRight,
        runBackwardPinRight: data.foot.runBackwardPinRight
    });
    runFoward: function() {
        this.foot.runFoward();
        after((1).seconds(), this.stop);
    },
    runBackward: function() {
        this.foot.runBackward();
        after((1).seconds(), this.stop);
    },

    turnLeft: function() {
        this.foot.turnLeft();
        after((1).seconds(), this.stop);
    },
    turnRight: function() {
        this.foot.turnRight();
        after((1).seconds(), this.stop);
    },
    stop: function() {
        this.foot.stop();
    }
};


var Cylon = require('cylon');

Cylon.api('http', {
    ssl: false // serve unsecured, over HTTP
    // optional configuration here.
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

    },

    body: new body({
        foot: {
            runFowardPinLeft: this.pin13,
            runBackwardPinLeft: this.pin11,
            runFowardPinRight: this.pin21,
            runBackwardPinRight: this.pin19
        }
    }),

    commands: {
        runFoward: function() {
            this.body.runFoward();
        },
        runBackward: function() {
            this.body.runBackward();
        },
        turnLeft: function() {
            this.body.turnLeft();
        },
        turnRight: function() {
            this.body.turnRight();
        },
        stop: function() {
            this.body.stop();
        }
    }

}).start();