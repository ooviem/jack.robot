var makePwm = require('../adafruit-pca9685/adafruit-pca9685.js');
var pwm = makePwm({"freq": 60, "correctionFactor": 1.118});
var setServoPulse = function(channel, pulse) {
  var pulseLength;
  pulseLength = 1000000;
  pulseLength /= 60;
  pulseLength /= 4096;
  pulse *= 1000;
  pulse /= pulseLength;
  return pwm.setPwm(channel, 0, pulse);
};
setServoPulse(0, 200);
setServoPulse(0, 400);