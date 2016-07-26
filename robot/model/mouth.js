module.exports = function(hardwareIO) {
	this.speak = function(text){
		console.log(text);
		hardwareIO.mouth.say(text);
	};
};
