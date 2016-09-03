var makePwm = require('../adafruit-pca9685/adafruit-pca9685.js');
var pwm = makePwm({"freq": 60, "correctionFactor": 1.118});
var command = require("../utils/command.js");

var setServoPulse = function(channel, pulse) {
	var pulseLength;
	pulseLength = 1000000;
	pulseLength /= 60;
	pulseLength /= 4096;
	pulse *= 1000;
	pulse /= pulseLength;
	console.log(pulse);
	return pwm.setPwm(channel, 0, pulse);
};
module.exports = function (hardwareIO){

	this.verticalPos = 450;
	this.minVerticalPos = 175;
	this.maxVerticalPos = 600;
	this.horizontalPos = 410;
	this.minHorizontalPos = 200;
	this.maxHorizontalPos = 650;

	pwm.setPwm(0, 0, this.horizontalPos);
	pwm.setPwm(1, 0, this.verticalPos);


	this.turn = function(degree) {
		this.horizontalPos = degree;
		pwm.setPwm(0, 0, degree);
	};

	this.move = function(degree){
		this.verticalPos = degree;
		pwm.setPwm(1, 0, degree);
	};


	this.turnLeft = function(){
		console.log("Head turn left");
		this.turn(this.minHorizontalPos);
	};

	this.turnRight = function(){
		console.log("Head turn right");
		this.turn(this.maxHorizontalPos);
	};
	
	this.moveUp = function(){
		console.log("Head move up");
		this.move(this.minVerticalPos);
	};

	this.moveDown = function(degree){
		console.log("Head move down");
		this.move(this.maxVerticalPos);
	};

	this.ultrasonic = {
		read: function(){
			return command.readUltrasonic();
		}
	};

};
