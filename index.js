 
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const messages = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true })) 

app.post('/hello',(req, res) => {
	messages.push({data: req.body, params: req.params})
	console.log('Params: ',req.params)
	res.sendStatus(200);
})
app.get('/hello/info',(req, res)=>{

	res.json({status: 'OK', payload: messages});
})

app.listen(PORT, () =>{
	console.log('Server running...on port', PORT);
})