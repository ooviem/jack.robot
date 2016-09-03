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
    this.runWithDistance = function(destination) {
    	destination = destination? destination : 4;
    	var safeDistance = 35;
    	var distance;
    	var head = this.head;
    	var foot = this.foot;
    	var isFirstTime = true;

    	head.move(490);
    	head.turn(410);
    	var breakInterval = false;
    	var task = function(){
    		if(destination > 0){
	            read = head.ultrasonic.read();
	            read.then(function (data) {
	                distance = data.stderr;
	                if(distance < safeDistance){
		    			foot.stop();
		    			breakInterval = true;
	    			} else if (distance > safeDistance) {
		    			isFirstTime = false;
		    			foot.runForward();
		    			destination -= 1;
		    			task();
	    		   }
	            });
    		} else {
    			foot.stop();
    		}
    	}
    	task();


    };
};
