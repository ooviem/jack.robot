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
	return pwm.setPwm(channel, 0, pulse);
};
module.exports = function (){
	this.currentPosition = 150;
	this.turn = function(degree){
		pwm.setPwm(0, 0, degree);
	};

	this.move = function(degree){
		pwm.setPwm(1, 0, degree);
	};

	this.turnLeft = function(){
		console.log("turnLeft");

		this.turn(150);
	};

	this.turnRight = function(){
		this.turn(650);
	};
	
	this.moveUp = function(){
		this.move(150);
	};

	this.moveDown = function(degree){
		this.move(650);
	};

};
