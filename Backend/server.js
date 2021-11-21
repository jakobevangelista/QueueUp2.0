require('dotenv').config;

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const RawgGenreController = require('./controller/RAWGGenreController.js');
const TwitterController = require('./controller/TwitterController.js');
const IGDBController = require('./controller/IGDBController.js');



app.post('/twitterCall', TwitterController)
app.post('/IGDBCall', IGDBController)
app.post('/RAWGCall', RawgGenreController)

app.listen(port, ()=> {
    console.log("App is listening on local host");
})