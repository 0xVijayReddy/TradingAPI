require("dotenv").config();
const express = require("express");
const models = require("./db/models");
const bodyParser = require("body-parser")
const app = express();
const PORT = process.env.PORT || 5000


const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // support json encoded bodies


app.use("/sendalert",require("./routes/alerts/alerts-sendalert"));
app.use("/scrips",require("./routes/scrips/scrips-scrips"));
app.use("/positions",require("./routes/alerts/alerts-positions"));




app.listen(PORT,()=>{
	console.log(`server listening at port ${PORT}`);
})