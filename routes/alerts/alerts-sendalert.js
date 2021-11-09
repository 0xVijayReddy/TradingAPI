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
						axios.post("https://hooks.slack.com/services/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",payload={"text": "A very important thing has occurred! <https://alert-system.com/alerts/1234|Click here> for details!"});

					}
					else{
						console.log("alert sent");
						axios.post("https://hooks.slack.com/services/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",payload={"text": "A very important thing has occurred! <https://alert-system.com/alerts/1234|Click here> for details!"});
					}
				}
			}
			
		})

	})
	res.sendStatus(200);
	
})

router.get("/test",(req,res)=>{
	axios.post(req.query.url,{text:"Rise alert "})
	.then(_=>{
		res.sendStatus(200);
	})


});







module.exports = router;