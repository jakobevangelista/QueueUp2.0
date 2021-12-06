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

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://queueup-front.herokuapp.com');
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {
    res.send('Working')
})
app.post('/twitterCall', TwitterController)
app.post('/IGDBCall', IGDBController)
app.post('/RAWGCall', RawgGenreController)
app.post('/Birthyear', BirthYearRecommendation)
app.post('/Twitch', TwitchController)
app.post('/IGDBKey', IGDBKeySearch)
app.post('/IGDBKeyRec', IGDBKeyRecommendation)



app.listen(process.env.PORT || 3000, ()=> {
    console.log("App is listening on local host");
})