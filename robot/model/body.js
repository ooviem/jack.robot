var foot = require("./foot.js");
var mouth = require("./mouth.js");
var head = require("./head.js");

module.exports = function(hardwareIO) {
    this.foot = new foot({
        runForwardPinLeft: hardwareIO.foot.runForwardPinLeft,
        runBackwardPinLeft: hardwareIO.foot.runBackwardPinLeft,
        runForwardPinRight: hardwareIO.foot.runForwardPinRight,
        runBackwardPinRight: hardwareIO.foot.runBackwardPinRight
    });
    this.mouth = mouth;
    this.head = new head({
    	triggerPin: hardwareIO.head.triggerPin,
    	echoPin: hardwareIO.head.echoPin
    });
    this.runWithDistance = function(destination) {
    	destination = destination? destination : 10;
    	mouth.speak("destination set, move "+destination+" units");
    	var safeDistance = 35;
    	var distance;
    	var head = this.head;
    	var foot = this.foot;
    	var mouth = this.mouth;
    	head.move(490);
    	head.turn(410);
    	var breakInterval = false;
    	var findLeft = function(){
    		head.move(490);
    		head.turn(570);
    		var read = head.ultrasonic.read();
	            read.then(function (data) {
	                distance = data.stderr;
	                if(distance < safeDistance){
		    			findRight();
	    			} else if (distance > safeDistance) {
	    				head.move(490);
    					head.turn(410);
		    			foot.turnLeft();
		    			after((1).seconds(), function() {
							foot.stop();
							task();
						});
	    		   }
	        });
    	};
    	var findRight = function(){
    		head.move(490);
    		head.turn(250);
    		var read = head.ultrasonic.read();
	            read.then(function (data) {
	                distance = data.stderr;
	                if(distance < safeDistance){
		    			foot.stop();
		    			mouth.speak("No way to reach destination");
	    			} else if (distance > safeDistance) {
	    				head.move(490);
    					head.turn(410);
		    			foot.turnRight();
		    			after((1).seconds(), function() {
							foot.stop();
							task();
						});
	    		   }
	        });
    	};
    	var task = function(){
    		if(destination > 0){
	            var read = head.ultrasonic.read();
	            read.then(function (data) {
	                distance = data.stderr;
	                if(distance < safeDistance){
	                	findLeft();
		    			foot.stop();
	    			} else if (distance > safeDistance) {
		    			foot.runForward();
		    			destination -= 1;
		    			task();
	    		   }
	            });
    		} else {
    			mouth.speak("I am on the destination");
    			foot.stop();
    		}
    	}
    	task();


    };
};
