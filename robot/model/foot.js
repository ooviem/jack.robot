module.exports = function(hardwareIO) {
    this.leftEngine = {
        runForward: function() {
            console.log("Left engine forward");
            console.log(hardwareIO.runForwardPinLeft.pin);
            hardwareIO.runForwardPinLeft.digitalWrite(1);
            hardwareIO.runBackwardPinLeft.digitalWrite(0);
        },
        runBackward: function() {
            console.log("Left engine backward");
            console.log(hardwareIO.runBackwardPinLeft.pin);

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
            console.log(hardwareIO.runForwardPinRight.pin);

            hardwareIO.runForwardPinRight.digitalWrite(1);
            hardwareIO.runBackwardPinRight.digitalWrite(0);
        },
        runBackward: function() {
            console.log("Right engine backward");
            console.log(hardwareIO.runBackwardPinRight.pin);

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
        console.log("Foot stopped");
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
