require('dotenv').config;

const twit = require('./twitter');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('this is working');
})

app.post('/', (req, res) =>{
  res.send(twit.geTweet(req.body.keyword));
});

app.listen(3000, ()=> {
    console.log("App is listening the local host");
})