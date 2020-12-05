const pidCrypt = require("pidcrypt");
const express = require("express");
const msgaxios = require("./lib/msgaxios.js");
const msghook = require("./lib/msghook.js");
const app = express();
const PORT = process.env.PORT || 3000;
const cryptedToken =
  "U2FsdGVkX18miheDr1a4vy5RuOAoHZsA197H6IgexVNZwZJa8Z3FF5T0Y2bon/Tb9U0Yjuke4SFEN9C6A4g9LvL/Zh7Ux4b0b/GsezOB1dk=";
require("pidcrypt/aes_cbc");
const pw = "hello world";
const tokenHook =
  "U2FsdGVkX18e7tkHOyqtkVl1Hl+GKykk8dkSLCA+oJ8Uf9M8Ocoj6QAgrBBBlvMm6y1J9PPP+9898xc5SCy7lg==";
const URLHookMessage = "https://hooks.slack.com/services/";
const URLPostMeaasge = "https://slack.com/api/chat.postMessage";
const aes = new pidCrypt.AES.CBC();
const messages = [];

const decryptedToken = aes.decryptText(cryptedToken, pw);
const decryptedHookToken = aes.decryptText(tokenHook, pw);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/hello", (req, res) => {
  messages.push({
    user: req.body.user_name,
    msg: req.body.text,
    date: new Date().toLocaleString(),
    channel: req.body.channel_name
  });
  const dataObj = {};
  const messsage = req.body.text;
  const channel = req.body.channel_id;

  if (messsage.search("#general ") != -1) {
    dataObj.text = messsage.replace(/#general/gi, "");
    dataObj.token = decryptedHookToken;
    dataObj.url = URLHookMessage;
    msghook(dataObj).then((resolve) => {
      res.sendStatus(200);
    });
  } else {
    dataObj.channelID = channel;
    dataObj.token = decryptedToken;
    dataObj.text = messsage;
    dataObj.url = URLPostMeaasge;
    msgaxios(dataObj).then((resolve) => {
      res.sendStatus(200);
    });
  }
});
app.get("/hello/info", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json({ status: "OK", data: messages });
});

app.listen(PORT, () => {
  console.log("Server running...on port", PORT);
});
