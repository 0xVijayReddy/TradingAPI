const models = require("../../db/models");
const axios  = require("axios");
const router = require("express").Router();
const funcs  = require("../../utils/funcs");
var token ;
funcs.getNewToken().then(response=>{
	token=response.data.data.jwtToken;
});


router.get("/", (req,res)=>{
	models.Position.find()
	.sort({option_type:1})
	.then(data=>{
		data = data.map(pos=>({exchange:"NFO",tradingsymbol:pos.symbol,symboltoken:pos.token}));
		return data;
	})
	.then(data=>{
		const request1 = axios(funcs.getConfig(token,data[0]));
		const request2 = axios(funcs.getConfig(token,data[1]));
		axios.all([request1,request2])
		.then(prices=>{
			if(prices[0].status){
				const call_option_price = prices[0].data.data.ltp;
				const put_option_price = prices[1].data.data.ltp;
				const percent = Math.round((Math.min(call_option_price,put_option_price)/Math.max(call_option_price,put_option_price))*100);
				if(percent>50){
					if(call_option_price>put_option_price){
						console.log("alert sent");
						axios.post(process.env.SLACK_WEBHOOK_URL,{text:"Rise alert "+percent});

					}
					else{
						console.log("alert sent");
						axios.post(process.env.SLACK_WEBHOOK_URL,{text:"Fall alert "+percent});
					}
				}
			}
			
		})

	})
	.then(less=>{
		res.send(less);
	})
	
})







module.exports = router;