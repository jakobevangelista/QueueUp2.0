require('dotenv').config;

const express = require('express');
const app = express();

app.use(express.json());
const RawgGenreController = require('./controller/RAWGGenreController.js');
const TwitterController = require('./controller/TwitterController.js');
const IGDBController = require('./controller/IGDBController.js');
const IGDBkeySearch = require('./controller/IGDBsearchController.js');
const IGDBrec = require('./controller/IGDBrecController.js');



app.post('/twitterCall', TwitterController)
app.post('/IGDBCall', IGDBController)
app.post('/RAWGCall', RawgGenreController)
app.post('/IGDBkeyCall', IGDBkeySearch)
app.post('/IGDBrecCall', IGDBrec)

app.listen(3000, ()=> {
    console.log("App is listening on local host");
})