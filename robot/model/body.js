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
    	var safeDistance = 27;
    	var distance;
    	var head = this.head;
    	var foot = this.foot;
    	var mouth = this.mouth;
    	// mouth.speak("destination set, move "+destination+" units");
    	head.move(560);
    	head.turn(410);
    	var leftCount = 0;
        var rightCount = 0;
        var turnCount = 0;
        var isTurning = false;
        var breakInterval = false;
        var hasTurned = false;
    	var findLeft = function() {
            head.move(530);
    		head.turn(560);
    		var read = head.ultrasonic.read();
            read.then(function (data) {
                distance = data.stderr;
                if(distance < safeDistance){
	    			if(!isFindingWay){
                        findRight();
                    } else {
                        task();
                    }
    			} else if (distance > safeDistance) {
    				head.move(560);
					head.turn(410);
	    			foot.turnLeft();
                    if(isTurning) {
                        destination = destination + 2;
                        leftCount = (leftCount + 1) % 3;
                        rightCount = (rightCount + 2) % 3
                        isTurning = false;
                    } else {
                        leftCount--;
                    }

	    			after((0.9).seconds(), function() {
						foot.stop();
						task();
					});
    		   }
        	});
    	};
    	var findRight = function(){
    		head.move(530);
    		head.turn(250);
    		var read = head.ultrasonic.read();
            read.then(function (data) {
                distance = data.stderr;
                if(distance < safeDistance){
	    			if(!isFindingWay){
                        foot.stop();
                    } else {
                        task();
                    }
	    			// mouth.speak("No way to reach destination");
    			} else if (distance > safeDistance) {
    				head.move(560);
					head.turn(410);
	    			foot.turnRight();
                    if(isTurning) {
                        destination = destination + 2;
                        leftCount = (leftCount + 1) % 3;
                        rightCount = (rightCount + 2) % 3;
                        isTurning = false;
                    } else {
                        rightCount--;
                    }
	    			after((0.9).seconds(), function() {
						foot.stop();
						task();
					});
    		   }
	        });
    	};
        var isFindingWay = false;
    	var task = function() {
    		if(destination > 0){
	            var read = head.ultrasonic.read();
	            read.then(function (data) {
	                distance = data.stderr;
	                if(distance < safeDistance){
                        foot.stop();
                        isTurning = true;

                        turnCount ++;
                        after(0.5, findLeft());
                        console.log();
	    			} else if (distance > safeDistance) {
		    			if(leftCount > rightCount && turnCount > 0 && hasTurned == false){
                            isFindingWay = true;
                            findLeft();
                            hasTurned = true;
                        } else if (leftCount < rightCount && turnCount > 0 && hasTurned == false){
                            isFindingWay = true;
                            findRight();
                            hasTurned = true;
                        } else {
                            hasTurned = true
                        }
                        if(hasTurned == true){
                           foot.runForward();
                           hasTurned = false;
                           destination--;
                        }
		    			task(); 
	    		    }
	            });
    		} else {
                head.move(450);
                head.turn(410);
    			// mouth.speak("Destination reached");
    			foot.stop();
    		}
    	}
    	task();


    };
};
