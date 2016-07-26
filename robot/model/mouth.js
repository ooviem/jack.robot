module.exports = function(hardwareIO) {
	this.speak = function(text){
		hardwareIO.say(text);
	};
};
