const axios = require('axios');
const qs = require('qs');

function config(settings){
	const data = qs.stringify({
	 'channel': settings.channelID,
	'text': settings.text
	});
	const config = {
	  method: 'post',
	  url: 'https://slack.com/api/chat.postMessage',
	  headers: { 
	    'Authorization': 'Bearer ' + settings.token, 
	    'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  data : data
	};
	return config;
}

const msgaxios = function(settings){
	axios(config(settings))
	.then(function (response) {
	  console.log(JSON.stringify(response.data));
	})
	.catch(function (error) {
		// some errors
	});
}

module.exports = msgaxios;
