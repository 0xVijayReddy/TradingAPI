const mongoose = require("mongoose");


const PositionSchema = new mongoose.Schema({
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
	},
	option_type:{
		type:String,
		enum:['PE','CE'],
	}
});

const Position = mongoose.model("Position",PositionSchema);

module.exports = Position;