var axios = require('axios');



function getNewToken(){
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

module.exports = {
	getNewToken,
	getConfig,
}