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
pwm.setPwm(0, 0, 150);
pwm.setPwm(1, 0, 150);
setTimeout(function(){
	pwm.setPwm(0, 0, 600);
}, 1000);
setTimeout(function(){
	pwm.setPwm(1, 0, 600);
}, 1000);
pwm.setPwm(0, 0, 150);
pwm.setPwm(1, 0, 150);
setTimeout(function(){
	pwm.setPwm(0, 0, 600);
}, 1000);
setTimeout(function(){
	pwm.setPwm(1, 0, 600);
}, 1000);

pwm.setPwm(0, 0, 150);
pwm.setPwm(1, 0, 150);
setTimeout(function(){
	pwm.setPwm(0, 0, 600);
}, 1000);
setTimeout(function(){
	pwm.setPwm(1, 0, 600);
}, 1000);

pwm.setPwm(0, 0, 150);
pwm.setPwm(1, 0, 150);
setTimeout(function(){
	pwm.setPwm(0, 0, 600);
}, 1000);
setTimeout(function(){
	pwm.setPwm(1, 0, 600);
}, 1000);

pwm.setPwm(0, 0, 150);
pwm.setPwm(1, 0, 150);
setTimeout(function(){
	pwm.setPwm(0, 0, 600);
}, 1000);
setTimeout(function(){
	pwm.setPwm(1, 0, 600);
}, 1000);

pwm.setPwm(0, 0, 150);
pwm.setPwm(1, 0, 150);
setTimeout(function(){
	pwm.setPwm(0, 0, 600);
}, 1000);
setTimeout(function(){
	pwm.setPwm(1, 0, 600);
}, 1000);

