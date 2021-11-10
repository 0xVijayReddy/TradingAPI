var axios = require('axios');


getNewToken = ()=>{
	var data = JSON.stringify({
	    "clientcode":process.env.CLIENT_ID,
	    "password":process.env.PASSWORD,
	});

	var config = {
	  method: 'post',
	  url: 'https://apiconnect.angelbroking.com/rest/auth/angelbroking/user/v1/loginByPassword',

	  headers : {
	    'Content-Type': 'application/json',
	    'Accept': 'application/json',
	    'X-UserType': 'USER',
	    'X-SourceID': 'WEB',
	    'X-ClientLocalIP': 'CLIENT_LOCAL_IP',
	    'X-ClientPublicIP': 'CLIENT_PUBLIC_IP',
	    'X-MACAddress': 'MAC_ADDRESS',
	    'X-PrivateKey': process.env.API_KEY,
	  },
	  data : data
	};

	return axios(config);
	
}

getConfig = (token,data)=>{
  return {
	  method: 'post',
	  url: 'https://apiconnect.angelbroking.com/order-service/rest/secure/angelbroking/order/v1/getLtpData',
	  headers: { 
	    'Authorization': 'Bearer '+token, 
	    'Content-Type': 'application/json', 
	    'Accept': 'application/json', 
	    'X-UserType': 'USER', 
	    'X-SourceID': 'WEB', 
	    'X-ClientLocalIP': 'CLIENT_LOCAL_IP', 
	    'X-ClientPublicIP': 'CLIENT_PUBLIC_IP', 
	    'X-MACAddress': 'MAC_ADDRESS', 
	    'X-PrivateKey': 'bcjLH801'
	  },
	  data : data
	};	

}

sendAlert = (prices)=>{
	const call_option_price = prices[0].data.data.ltp;
	const put_option_price = prices[1].data.data.ltp;
	const percent = Math.round((Math.min(call_option_price,put_option_price)/Math.max(call_option_price,put_option_price))*100);
	console.log(call_option_price,put_option_price,percent);
	if(percent<50){
		if(call_option_price>put_option_price){
			axios.post(process.env.SLACK_WEBHOOK_URL,payload={"text": "Alert from updated code"});
		}
		else{
			axios.post(process.env.SLACK_WEBHOOK_URL,payload={"text": "Alert from updated code"});
		}
	}

}

module.exports = {
	getNewToken,
	getConfig,
	sendAlert,
}