var usonic = require('mmm-usonic');
usonic.init(function (error) {
    if (error) {
        ...
    } else {
        ...
    }
});
var sensor = usonic.createSensor(22, 12, 450);
var distance = sensor();
console.log(distance);