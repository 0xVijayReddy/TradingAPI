const models = require("../../db/models");
const axios  = require("axios");
const router = require("express").Router();
const funcs  = require("../../utils/funcs");
var token ;
funcs.getNewToken().then(response=>{
	token=response.data.data.jwtToken;
});


router.get("/", (req,res)=>{
	const date = new Date();
	models.Position.find()
	.sort({option_type:1})
	.then(data=>{
		data = data.map(pos=>({exchange:"NFO",tradingsymbol:pos.symbol,symboltoken:pos.token}));
		return data;
	})
	.then(positions_data=>{
		if(!positions_data)
			throw new Error('Positions Data Not Found');
		const request1 = axios(funcs.getConfig(token,positions_data[0]));
		const request2 = axios(funcs.getConfig(token,positions_data[1]));
		return axios.all([request1,request2])
	})
	.then(prices=>{
		if(!prices[0].status){
			if(prices[0].message=="Invalid Token")
				throw new Error('TokenError');
			throw new Error('APIError');
		}
		funcs.sendAlert(prices);		
	})
	.catch(error=>{
		if(error=="TokenError"){
			funcs.getNewToken().then(response=>{
				token=response.data.data.jwtToken;
			})
		}
		else{
			axios.post(process.env.SLACK_WEBHOOK_URL,payload={"text":"Unknown error occured"});
		}

	})
	res.send(date.getMinutes()+" Hour "+date.getHours());
	
})

module.exports = router;