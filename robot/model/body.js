var foot = require("./foot.js");
var mount = require("./mouth.js");
var head = require("./head.js");

module.exports = function(hardwareIO) {
    this.foot = new foot({
        runForwardPinLeft: hardwareIO.foot.runForwardPinLeft,
        runBackwardPinLeft: hardwareIO.foot.runBackwardPinLeft,
        runForwardPinRight: hardwareIO.foot.runForwardPinRight,
        runBackwardPinRight: hardwareIO.foot.runBackwardPinRight
    });
    this.mouth = mount;
    this.head = new head({
    	triggerPin: hardwareIO.head.triggerPin,
    	echoPin: hardwareIO.head.echoPin
    });
    this.runWithDistance = function() {
    	var head = this.head;
    	var foot = this.foot;
    	head.move(530);
    	head.turn(410);
    	foot.runForward();
    	var distance;
    	every((0.3).seconds(), function() {
    		if(distance < 20){
    			foot.stop();
    		}
            read = head.ultrasonic.read();
            read.then(function (data) {
               distance = data.stderr;
            });
        });

    };
};
