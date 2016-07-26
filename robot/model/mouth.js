module.exports = function(hardwareIO) {
	this.speak = function(text){
		console.log("SPEAK: "+ text);
		hardwareIO.mouth.say(text);
	};
};
