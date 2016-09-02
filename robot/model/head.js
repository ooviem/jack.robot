var makePwm = require('../adafruit-pca9685/adafruit-pca9685.js');
var pwm = makePwm({"freq": 60, "correctionFactor": 1.118});
var setServoPulse = function(channel, pulse) {
	var pulseLength;
	pulseLength = 1000000;
	pulseLength /= 60;
	pulseLength /= 4096;
	pulse *= 1000;
	pulse /= pulseLength;
	console.log(pulse);
	return pwm.setPwm(channel, 425, pulse);
};
module.exports = function (){
	this.currentPosition = 175;
	this.turn = function(degree){
		pwm.setPwm(0, 0, degree);
	};

	this.move = function(degree){
		pwm.setPwm(1, 0, degree);
	};

	this.turnLeft = function(){
		console.log("Head turn left");
		this.turn(175);
	};

	this.turnRight = function(){
		console.log("Head turn right");
		this.turn(675);
	};
	
	this.moveUp = function(){
		console.log("Head move up");
		this.move(175);
	};

	this.moveDown = function(degree){
		console.log("Head move down");
		this.move(675);
	};

};
