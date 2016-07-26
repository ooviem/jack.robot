module.exports = function(hardwareIO) {
	this.speak = function(text){
		console.log(hardwareIO.mouth);
		hardwareIO.mouth.say(text);
	};
};
