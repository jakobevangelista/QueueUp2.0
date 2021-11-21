// This will return a list of recommended games based on your birth year

module.exports = (req,res) => {
    // store the RAWG API key somewhere
    var KEY = '880cb7502f4344e08b5d8ba2a73538da';

    const https = require('https')
    const options = {
        hostname: 'api.rawg.io',
        //req.body.genre
        path: '/api/games?key='+KEY+'&ordering=-rating&page_size=1000&dates='+req.body.year+'-01-01,'+req.body.year+'-12-31',
        method: 'GET'
    }

    const request = https.request(options, response => {
        console.log(`statusCode: ${response.statusCode}`)
        var str = "";
        response.on('data', d => {
            // process.stdout.write(d)
            str += d;
            // console.log(JSON.parse(d))
        })

        response.on('end', function(){
            // console.log(str)
            var res_json = JSON.parse(str)
            var arr = []
            for(let i = 0; i < 10; i++){
                var name = res_json["results"][i]["name"]
                // console.log(res_json["results"][i]["rating"])
                var img = res_json["results"][i]["background_image"]
                arr.push([name, img])
            }
            // console.log(arr)
            res.status(200).send(arr)
        })
    })

    request.on('error', error => {
        console.error(error)
        res.status(400).send("bad")
    })

    request.end()
}