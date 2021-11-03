require('dotenv').config;

const twit = require('./twitter');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('this is working');
})

app.post('/twitterCall', (req, res) =>{
  res.send(twit.geTweet(req.body.keyword));
});

app.post('/IGDBCall', (req, res) => {
  res.send('This is the endpoint for IGDB API');
});

app.post('/twitchCall', (req, res) => {
  res.send('This is endpoint for twitch api');
});

app.post('/RAWGCall', (req, res) => {
  res.send('This is endpoint for ')
})

app.listen(3000, ()=> {
    console.log("App is listening the local host");
})