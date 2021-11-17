const router = require("express").Router();
const models = require("../../db/models");



router.post('/adjust',(req,res)=>{
	const type = req.body.type;
	const symbol = req.body.symbol;
	Promise.all([
		models.Position.findOne({option_type:type}),
		models.Scrip.findOne({symbol:symbol}),
	])
	.then(data=>{
		if(!data[0])
			throw new Error("PositionNotExist")
		if(!data[0])
			throw new Error("NewPositionNotFound")

		data[0].token=data[1].token;
		data[0].symbol=data[1].symbol;
		data[0].expiry=data[1].expiry;
		data[0].strike=data[1].strike;
		return data[0].save();
	})
	.then(pos=>{
		res.send({status:"success",data:pos});
	})
	.catch(error=>{
		res.send({status:"error",data:{},message:error.message});
	})

});


module.exports = router;
