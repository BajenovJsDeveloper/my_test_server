const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const messages = [];

app.use(express.json());

app.post('/hello',(req, res) => {
	messages.push({data: req.body})
	res.sendStatus(200);
})
app.get('/hello/1',(req, res)=>{

	res.json({status: 'OK', payload: messages});
})

app.listen(PORT, () =>{
	console.log('Server running...on port', PORT);
})
