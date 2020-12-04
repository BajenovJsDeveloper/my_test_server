const pidCrypt = require("pidcrypt");
const express = require('express');
const msgaxios = require('./lib/msgaxios.js');
const app = express();
const PORT = process.env.PORT || 3000;
const crypted = 'U2FsdGVkX18miheDr1a4vy5RuOAoHZsA197H6IgexVNZwZJa8Z3FF5T0Y2bon/Tb9U0Yjuke4SFEN9C6A4g9LvL/Zh7Ux4b0b/GsezOB1dk=';
require("pidcrypt/aes_cbc");
const pw =  "hello world";
const aes = new pidCrypt.AES.CBC();
const messages = [];

const decrypted = aes.decryptText(crypted, pw);

app.use(express.json());
app.use(express.urlencoded({ extended: true })) 

app.post('/hello',(req, res) => {
	messages.push({data: req.body, params: req.params})
	const dataObj = {
		channelID: req.body.channel_id,
		token: decrypted,
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

