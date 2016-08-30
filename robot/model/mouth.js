var command = require("../utils/command.js");
module.exports = {
	speak: function(text){
		console.log("SPEAK: "+ text);
		command.speak(text);
	}
};
