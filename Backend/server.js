require('dotenv').config;

const express = require('express');
const app = express();

app.use(express.json());
const RawgGenreController = require('./controller/RAWGGenreController.js');
const TwitterController = require('./controller/TwitterController.js');
const IGDBController = require('./controller/IGDBController.js');
const BirthYearRecommendation = require('./controller/BirthYearRecommendation.js');
const IGDBKeySearch = require('./controller/IGDBKeySearchController.js')
const IGDBKeyRecommendation = require('./controller/IGDBRecController.js')
const TwitchController = require('./controller/TwitchController.js')



app.post('/twitterCall', TwitterController)
app.post('/IGDBCall', IGDBController)
app.post('/RAWGCall', RawgGenreController)
app.post('/Birthyear', BirthYearRecommendation)
app.post('/Twitch', TwitchController)
app.post('/IGDBKey', IGDBKeySearch)
app.post('/IGDBKeyRec', IGDBKeyRecommendation)



app.listen(3000, ()=> {
    console.log("App is listening on local host");
})