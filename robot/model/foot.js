module.exports = function(hardwareIO) {
    this.leftEngine = {
        runForward: function(speed) {
            console.log("Left engine forward");
            if (speed !== undefined) {
                console.log(speed);
                hardwareIO.runForwardPinLeft.pwmWrite(speed);
                hardwareIO.runBackwardPinLeft.pwmWrite(0);
            } else {
                hardwareIO.runForwardPinLeft.digitalWrite(1);
                hardwareIO.runBackwardPinLeft.digitalWrite(0);
            }
        },
        runBackward: function(speed) {
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
        runForward: function(speed) {
            console.log("Right engine forward");
            if (speed !== undefined) {
                hardwareIO.runForwardPinRight.pwmWrite(speed);
                hardwareIO.runBackwardPinRight.pwmWrite(0);
            } else {
                hardwareIO.runForwardPinRight.digitalWrite(1);
                hardwareIO.runBackwardPinRight.digitalWrite(0);
            }
        },
        runBackward: function(speed) {
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
    this.runForward = function(speed) {
        console.log("foot"+ speed);
        this.leftEngine.runForward(speed);
        this.rightEngine.runForward(speed);
        console.log("Foot running forward");
    };
    this.runBackward = function(speed) {
        this.leftEngine.runBackward();
        this.rightEngine.runBackward();
        console.log("Foot running backward");
    };
    this.stop = function() {
        console.log("Foot stopped");
        this.leftEngine.stopEngine();
        this.rightEngine.stopEngine();
    };
    this.turnLeft = function(speed) {
        this.leftEngine.runBackward(speed);
        this.rightEngine.runForward(speed);
        console.log("Foot turn left");
    };
    this.turnRight = function(speed) {
        this.leftEngine.runForward(speed);
        this.rightEngine.runBackward(speed);
        console.log("Foot turn right");
    };

};
