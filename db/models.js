const mongoose = require("mongoose");
const conn_string = process.env.MONGO_CONNECTION_STRING || "Invalid connection string!";

mongoose
	.connect(conn_string, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Mongo connection established successfully!");
	})
	.catch(err => {
		console.error(err.message);
	});

module.exports = {
	mongoose: mongoose,
	Scrip: require("./db-models/scrip"),
	Position:require("./db-models/position"),
};