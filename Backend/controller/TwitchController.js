require('dotenv').config();
const request = require('request');
module.exports = (req, res) =>{
    let bod;
    toSend = []
    const options = {
        url: process.env.GET_TOKEN,
        json: true,
        body: {
            client_id : process.env.cid,
            client_secret: process.env.csecret, 
            grant_type: 'client_credentials'
        }
    }
    
    request.post(options, (err, resp, body) => {
        if(err){
            return console.log(err);
        }
        console.log('Status : ', resp.statusCode);
        this.bod = body.access_token
        this.toPro;
        const gameOptions = {
            url : process.env.GET_GAMES,
            method :'GET', 
            headers : {
                'client-id': process.env.cid,
                'Authorization' : 'Bearer ' + this.bod,
            }
        }
        request.get(gameOptions, (err, respo, body) => {
            if(err){
                return console.log(err);
            }
            console.log('Status: ', respo.statusCode);
            this.toPro = JSON.parse(body)
            console.log(this.toPro)
            for(let i = 0; i < 20; i++){
                var name = this.toPro["data"][i]["name"]
                var img = this.toPro["data"][i]["box_art_url"]
                var img = img.replace("{width}", "1220")
                var img = img.replace("{height}", "1080")
                toSend.push([name, img])
            }  
            res.send(toSend).status(200)

        })

    });
}

