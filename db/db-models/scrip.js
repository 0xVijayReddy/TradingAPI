const mongoose = require("mongoose");

const scripSchema = new mongoose.Schema({
	token:{
		type:String,
	},
	symbol:{
		type:String,
	},
	expiry:{
		type:String,
	},
	strike:{
		type:String,
	}
});

const Scrip = mongoose.model("Scrip",scripSchema);
module.exports = Scrip;