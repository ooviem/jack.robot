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

    body: {
        foot: {
            leftEngine: {
                runFowardPin: this.pin13,
                runBackwardPin: this.pin11,
                runFoward: function() {
                    this.runFowardPin.digitalWrite(1);
                    this.runBackwardPin.digitalWrite(0);
                    console.log(this);
                },
                runBackward: function() {
                    this.runFowardPin.digitalWrite(0);
                    this.runBackwardPin.digitalWrite(1);
                },
                stop: function() {
                    this.runFowardPin.digitalWrite(0);
                    this.runBackwardPin.digitalWrite(0);
                }
            },
            rightEngine: {
                runFowardPin: this.pin21,
                runBackwardPin: this.pin19,
                runFoward: function() {
                    this.runFowardPin.digitalWrite(1);
                    this.runBackwardPin.digitalWrite(0);
                },
                runBackward: function() {
                    this.runFowardPin.digitalWrite(0);
                    this.runBackwardPin.digitalWrite(1);
                },
                stop: function() {
                    this.runFowardPin.digitalWrite(0);
                    this.runBackwardPin.digitalWrite(0);
                }
            },
            runFoward: function() {
                this.leftEngine.runFoward();
                this.rightEngine.runFoward();
            },
            runBackward: function() {
                this.leftEngine.runBackward();
                this.rightEngine.runBackward();
            },
            stop: function() {
                this.leftEngine.stop();
                this.rightEngine.stop();
            },
            turnLeft: function() {
                this.leftEngine.runBackward();
                this.rightEngine.runFoward();
            },
            turnRight: function() {
                this.leftEngine.runFoward();
                this.rightEngine.runBackward();
            }
        },
        runFoward : function() {
            this.foot.runFoward();
            after((1).seconds(), this.stop);
        },
        runBackward : function() {
            this.foot.runBackward();
            after((1).seconds(), this.stop);
        },

        turnLeft : function() {
           this.foot.turnLeft();
            after((1).seconds(), this.stop);
        },
        turnRight : function() {
            this.foot.turnRight();
            after((1).seconds(), this.stop);
        },
        stop : function() {
            this.foot.stop();
        }      
    },

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