// var axios = require('axios');
// // var data = JSON.stringify({
// //     "clientcode":"T48819",
// //     "password":"Animos@5255#"
// // });

// var data = JSON.stringify({
//     text:"Fucking awesome"
// });

// var config = {
//   method: 'post',
//   url: 'https://hooks.slack.com/services/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',
//   data : data
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });


var axios = require('axios');
const token = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlQ0ODgxOSIsInJvbGVzIjowLCJ1c2VydHlwZSI6IlVTRVIiLCJpYXQiOjE2MzYyNzg2ODIsImV4cCI6MTcyMjY3ODY4Mn0.aOOBYNh_I5ooTbZ7Q3dK_mbZrhXtTyAfz2aQ_QFJGr_23KxNge65hnLmk7DxCQoOpPs7R8-hxiLq33OZY7W0zw";
// var data = JSON.stringify({
//     "exchange": "NFO",
//     "tradingsymbol": "BANKNIFTY11NOV2137400PE",
//     "symboltoken": "48541"

// });

var config = {
  
  method: 'post',
  url: 'https://apiconnect.angelbroking.com/order-service/rest/secure/angelbroking/order/v1/getLtpData',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlQ0ODgxOSIsInJvbGVzIjowLCJ1c2VydHlwZSI6IlVTRVIiLCJpYXQiOjE2MzY0MDA0NjUsImV4cCI6MTcyMjgwMDQ2NX0.LBGfLxFLUEwzp1fI24YhPa5GJNHc6uo--lajJMJzznDSpBC19bJQbm_FX30x8SJPXktXtycU7Z19sdNpMXMfpg',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-UserType': 'USER',
    'X-SourceID': 'WEB',
    'X-ClientLocalIP': 'CLIENT_LOCAL_IP',
    'X-ClientPublicIP': 'CLIENT_PUBLIC_IP',
    'X-MACAddress': 'MAC_ADDRESS',
    'X-PrivateKey': 'bcjLH801'
  },
  data: {
    exchange: 'NFO',
    tradingsymbol: 'BANKNIFTY11NOV2139700CE',
    symboltoken: '48620'
  }


};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});