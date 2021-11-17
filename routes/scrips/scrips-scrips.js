const router = require("express").Router();
const models = require("../../db/models");


router.post('/',(req,res)=>{
	console.log(req.body);
	const type = req.body.type;
	const expiry = req.body.expiry;
	
	models.Scrip.find({
		expiry:expiry,
		symbol:{$regex:type+"$"},
	},
	{
		_id:0,
		symbol:1,
	})
	.then(data=>{
		res.send(data);
	})
	.catch(error=>{

		res.send({status:"error",data:[]});
	})
});

router.get('/expiries',(req,res)=>{
	models.Scrip.distinct("expiry",{expiry:{$ne:''}})
	.then(data=>{
		res.send({status:"sucess",data:data});
	})
	.catch(error=>{
		res.send({status:"error",data:[]});
	})

});



module.exports = router;
