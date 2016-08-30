var command = require("././utils/command.js");
module.exports = function(hardwareIO) {
	this.speak = function(text){
		console.log("SPEAK: "+ text);
		command.speak(text);
	};
};
