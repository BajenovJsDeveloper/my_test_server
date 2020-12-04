const express = require('express');
const msgaxios = require('./lib/msgaxios.js');
const app = express();
const PORT = process.env.PORT || 3000;
const messages = [];
const TOKEN = 'xoxb-120579660452-1572251223328-22PjsNaWYSTCiuk7aL4v12Z7';

app.use(express.json());
app.use(express.urlencoded({ extended: true })) 

app.post('/hello',(req, res) => {
	messages.push({data: req.body, params: req.params})
	const dataObj = {
		channelID: req.body.channel_id,
		token: TOKEN,
		text: req.body.text
	}
	msgaxios(dataObj);
	res.sendStatus(200);
})
app.get('/hello/info',(req, res)=>{
	res.json({status: 'OK', payload: messages});
})

app.listen(PORT, () =>{
	console.log('Server running...on port', PORT);
})
