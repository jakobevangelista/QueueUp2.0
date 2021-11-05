const request = require('https');
module.exports = (req,res) => {
    // uses the request package
    // store the RAWG API key somewhere
    var KEY = '880cb7502f4344e08b5d8ba2a73538da';

    const https = require('https')
    const options = {
        hostname: 'api.rawg.io',
        //req.body.genre
        path: '/api/games?key='+KEY+'&genres='+req.body.genre+'&ordering=-rating&page_size=1000&metacritic=70,100',
        method: 'GET'
    }

    // list of genres by key:
    // 4-action
    // 51-indie
    // 3-adventure
    // 5-role-playing-games-rpg
    // 10-strategy
    // 2-shooter
    // 40-casual
    // 14-simulation
    // 7-puzzle
    // 11-arcade
    // 83-platformer
    // 1-racing
    // 59-massively-multiplayer
    // 15-sports
    // 6-fighting
    // 19-family
    // 28-board-games
    // 34-educational
    // 17-card
    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        var str = "";
        res.on('data', d => {
            // process.stdout.write(d)
            str += d;
            // console.log(JSON.parse(d))
        })

        res.on('end', function(){
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

    req.on('error', error => {
        console.error(error)
        res.status(400).send("bad")
    })

    req.end()
}