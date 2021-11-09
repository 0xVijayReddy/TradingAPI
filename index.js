require("dotenv").config();
const express = require("express");
const models = require("./db/models");
const app = express();
const PORT = process.env.PORT || 5000

app.use("/sendalert",require("./routes/alerts/alerts-sendalert"));


app.listen(PORT,()=>{
	console.log(`server listening at port ${PORT}`);
})