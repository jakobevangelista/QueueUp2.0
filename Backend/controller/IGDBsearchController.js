
var request = require('request');
module.exports = (req,res) => {
    // retrieve the games that have the query within the names
    var options = {
        'method': 'POST',
        'url': 'https://api.igdb.com/v4/games/', // GAMES ENDPOINT
        'headers': {
            'Client-ID': 'yx9j15fb7kntnqe8xy0abmdfl04pnx',
            'Authorization': 'Bearer ccappafd8ac20qkclxalotj1yh0mbh',
            'Content-Type': 'text/plain'
        },
        body: 'fields name; limit 500; search "' + req.query + '";'
    };

    // send request
    var resp;
    request(options, function (error, response) {
        if (error) {
            throw new Error(error);
        }
        // parse response
        resp = JSON.parse(response.body);
        // console.log(resp); // print response

        var finalData = [];
        for (var i in resp) {
            var name = resp[i].name;
            finalData.push(name); 
            console.log(name);
        }
        // console.log(finalData);
        // return finalData;
        res.send(finalData).status(200)
    });
}