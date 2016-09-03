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
    this.runWithDistance = function(){
    	this.head.move(530);
    	this.head.turn(410);

    	var distance;
    	every((1).seconds(), function() {
            read = this.head.ultrasonic.read();
            read.then(function (data) {
               distance = data.stderr;
            });
            console.log(distance);
        });

    };
};
