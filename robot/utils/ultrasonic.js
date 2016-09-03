var usonic = require('mmm-usonic');
usonic.init();
var sensor = usonic.createSensor(22, 12, 450);
usonic.init();
var distance = sensor();
console.log(distance);