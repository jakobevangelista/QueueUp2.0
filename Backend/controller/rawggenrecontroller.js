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

// list of platforms by key:
// 4 - pc
// 187 - playstation5
// 1 - xbox-one
// 18 - playstation4
// 186 - xbox-series-x
// 7 - nintendo-switch
// 3 - ios
// 21 - android
// 8 - nintendo-3ds
// 9 - nintendo-ds
// 13 - nintendo-dsi
// 5 - macos
// 6 - linux
// 14 - xbox360
// 80 - xbox-old
// 16 - playstation3
// 15 - playstation2
// 27 - playstation1
// 19 - ps-vita
// ....
// many more, we can update the list if we need more

module.exports = (req,res) => {
    // store the RAWG API key somewhere
    var KEY = '880cb7502f4344e08b5d8ba2a73538da';
    var platformString = '';
    var multiplayerString = '';

    console.log(req.body.platform);
    if (req.body.platform != null) {
        platformString = '&platforms='+req.body.platform;
        console.log(platformString);
    }

    if (req.body.multiplayer != false){
        multiplayerString = '&tags=multiplayer';
        console.log(multiplayerString);
    }

    const https = require('https')
    const options = {
        hostname: 'api.rawg.io',
        //req.body.genre
        path: '/api/games?key='+KEY+'&genres='+req.body.genre+'&ordering=-rating&page_size=1000'+platformString+multiplayerString,
        method: 'GET'
    }

    const request = https.request(options, response => {
        console.log(`statusCode: ${response.statusCode}`)
        // console.log(req.body.multiplayer)
        // console.log('/api/games?key='+KEY+'&genres='+req.body.genre+'&ordering=-rating&page_size=1000'+platformString+multiplayerString)
        var str = "";
        response.on('data', d => {
            // process.stdout.write(d)
            str += d;
            // console.log(JSON.parse(d))
        })

        response.on('end', function(){
            // console.log(str)
            var res_json = JSON.parse(str)
            var count = res_json["count"];
            // console.log(count);
            if(count < 10){
                res.status(400).send("User too old");
            } else {
                var arr = []
                for(let i = 0; i < 10; i++){
                    var name = res_json["results"][i]["name"];
                    // console.log(res_json["results"][i]["rating"])
                    var img = res_json["results"][i]["background_image"];
                    arr.push([name, img])
                }
                // console.log(arr)
                res.status(200).send(arr)
            }
        })
    })

    request.on('error', error => {
        console.error(error)
        res.status(400).send("bad")
    })

    request.end()
}
//Platforms
//PC
//PlayStation 5
//Xbox One
//PlayStation 4
//Xbox Series S/X
//Nintendo Switch
//iOS
//Android
//Xbox 360
//PlayStation 3
//PlayStation 2