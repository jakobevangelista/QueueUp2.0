
// Get an app access token by making this request
// POST https://id.twitch.tv/oauth2/token?client_id=yx9j15fb7kntnqe8xy0abmdfl04pnx&client_secret=0p3ltlqazwd0izn39idbrld8tmradq&grant_type=client_credentials

var request = require('request');
module.exports = (req,res) => {
// retrieve the names for 10 games whose genre = genre
    var options = {
        'method': 'POST',
        'url': 'https://api.igdb.com/v4/games/', // GAMES ENDPOINT
        'headers': {
            'Client-ID': 'yx9j15fb7kntnqe8xy0abmdfl04pnx',
            'Authorization': 'Bearer bwpah7j4u5nzokow0itm08symaq0vp',
            'Content-Type': 'text/plain'
        },
        body: 'fields *, cover.*; limit 10; where genres.name = ("' + req.body.genre + '") & rating > 80; sort rating desc;'
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
        // var test = resp[0].cover;
        // console.log(test.url);

        var finalData = [];
        for (var i in resp) {
            var coverJSON = resp[i].cover;
            var name = resp[i].name;
            var img = coverJSON.url;
            var img = img.replace("thumb", "1080p")
            // push the name and cover url of each game onto the final data array
            finalData.push([name, img]); 
        }

            res.send(finalData).status(200)
        });
}   






// LIST of genres
// "id": 2, "name": "Point-and-click"
// "id": 4, "name": "Fighting"
// "id": 5, "name": "Shooter"
// "id": 7, "name": "Music"
// "id": 8, "name": "Platform"
// "id": 9, "name": "Puzzle"
// "id": 10, "name": "Racing"
// "id": 11, "name": "Real Time Strategy (RTS)"
// "id": 12, "name": "Role-playing (RPG)"
// "id": 13, "name": "Simulator"
// "id": 14, "name": "Sport"
// "id": 15, "name": "Strategy"
// "id": 16, "name": "Turn-based strategy (TBS)"
// "id": 24, "name": "Tactical"
// "id": 25, "name": "Hack and slash/Beat 'em up"
// "id": 26, "name": "Quiz/Trivia"
// "id": 30, "name": "Pinball"
// "id": 31, "name": "Adventure"
// "id": 32, "name": "Indie"
// "id": 33, "name": "Arcade"
// "id": 34, "name": "Visual Novel"
// "id": 35, "name": "Card & Board Game"
// "id": 36, "name": "MOBA"