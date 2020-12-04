const axios = require('axios');

function config(data){
	const config = {
	  method: "post",
	  url: data.url + data.token,
	  headers: { 
	    "Content-Type": "application/json"
	  },
	  data : JSON.stringify({"text": data.text})
	};
	return config;
}


function msghook(settings){
	const configData = config(settings);
	return axios(configData)
	.then(function (response) {
	  console.log(JSON.stringify(response.data));
	})
	.catch(function (error) {
		// some errors
	});
}

module.exports = msghook;