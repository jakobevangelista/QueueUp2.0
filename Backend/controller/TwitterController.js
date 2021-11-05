const twit = require('twit');
require('dotenv').config();
var finalData = '';


module.exports = (req,res) => {
    var T = new twit({
        consumer_key: process.env.c_key,
        consumer_secret: process.env.c_secret,
        access_token: process.env.a_token,
        access_token_secret: process.env.a_token_secret
    });
    
    let params = {
        q : req.body.keyword,
        count: 10, 
        lang: 'en',
        result_type: 'mixed'
    }
    
    console.log(req.body.keyword)
    T.get('search/tweets', params, (err, data) => {
        if(err){
            print(err)
            return null;
        } else {
            finalData = data;
            res.send(finalData)
        }

    });

}
