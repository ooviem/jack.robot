var makePwm = require('../../adafruit-pca9685/adafruit-pca9685.js');
var pwm = makePwm({"freq": 50, "correctionFactor": 1.118});
setServoPulse = function(channel, pulse) {
  var pulseLength;
  pulseLength = 1000000;
  pulseLength /= 60;
  print("%d us per period" % pulseLength);
  pulseLength /= 4096;
  print("%d us per bit" % pulseLength);
  pulse *= 1000;
  pulse /= pulseLength;
  return pwm.setPWM(channel, 0, pulse);
};
setServoPulse(0, 0, 150);
setServoPulse(0, 0, 600);