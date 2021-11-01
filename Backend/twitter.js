const twit = require('twit');
require('dotenv').config();
const express = require('express');

const app = express();

var finalData = '';

function geTweet(keyword){
    var T = new twit({
        consumer_key: process.env.c_key,
        consumer_secret: process.env.c_secret,
        access_token: process.env.a_token,
        access_token_secret: process.env.a_token_secret
    });
    
    let params = {
        q : keyword,
        count: 10, 
        lang: 'en',
        result_type: 'mixed'
    }
    
    
    T.get('search/tweets', params, (err, data) => {
        if(err){
            return null;
        }
        finalData = data;
    });
    return finalData;
}

module.exports = {geTweet};