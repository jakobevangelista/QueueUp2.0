require('dotenv').config();

const request = require('request');
const getToken = (url, callback) => {
    const options = {
        url: process.env.GET_TOKEN,
        json: true,
        body: {
            client_id : process.env.cid,
            client_secret: process.env.csecret, 
            grant_type: 'client_credentials'
        }
    }
    
    request.post(options, (err, res, body) => {
        if(err){
            return console.log(err);
        }
        console.log('Status : ', res.statusCode);
        console.log(body);

        callback(res);
    });
};

var access_token = '';
getToken(process.env.GET_TOKEN, (res) => {
    access_token = res.body.access_token;
    return access_token;
});

const getGames = (url, access_token, callback) => {
    const gameOptions = {
        url : process.env.GET_GAMES,
        method :'GET', 
        headers : {
            'client-id': process.env.cid,
            'Authorization' : 'Bearer ' + access_token,
        }
    }
    request.get(gameOptions, (err, res, body) => {
        if(err){
            return console.log(err);
        }
        console.log('Status: ', res.statusCode);
        console.log(JSON.parse(body));
    })
};

setTimeout(() => {
    getGames(process.env.GET_GAMES, access_token, (response) =>{

    });
}, 1000);

