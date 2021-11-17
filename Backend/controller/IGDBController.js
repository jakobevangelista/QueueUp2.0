// Get an app access token by making this request
// POST https://id.twitch.tv/oauth2/token?client_id=yx9j15fb7kntnqe8xy0abmdfl04pnx&client_secret=0p3ltlqazwd0izn39idbrld8tmradq&grant_type=client_credentials

var request = require('request');
module.exports = (req,res) => {
    // genre always has to be specified, but platform and multiplayer are optional
    var options;
    
    if (req.body.platform != null && req.body.multiplayer == false) {
        // genre and platform filters
        options = {
        'method': 'POST',
        'url': 'https://api.igdb.com/v4/games/', // GAMES ENDPOINT
        'headers': {
            'Client-ID': 'yx9j15fb7kntnqe8xy0abmdfl04pnx',
            'Authorization': 'Bearer 425rln2zko3i9hhs1ybbyboi8vwa2c',
            'Content-Type': 'text/plain'
        },
        body: 'fields genres.name, rating, name, platforms.name, cover.*; limit 10; where genres.name = ("' + req.body.genre + '") & rating > 80 & platforms.name = ("' + req.body.platform + '"); sort rating desc;'
        };
    } else if (req.body.platform == null && req.body.multiplayer != false) {
        // genre and multiplayer filters on
        console.log("genre and multiplayer");
        options = {
        'method': 'POST',
        'url': 'https://api.igdb.com/v4/games/', // GAMES ENDPOINT
        'headers': {
            'Client-ID': 'yx9j15fb7kntnqe8xy0abmdfl04pnx',
            'Authorization': 'Bearer 425rln2zko3i9hhs1ybbyboi8vwa2c',
            'Content-Type': 'text/plain'
        },
        body: 'fields name, rating, genres.name, genres.name, cover.*, multiplayer_modes.*; limit 10; where (multiplayer_modes.campaigncoop = true | multiplayer_modes.dropin = true | multiplayer_modes.lancoop = true | multiplayer_modes.offlinecoop = true | multiplayer_modes.onlinecoop = true | multiplayer_modes.splitscreen = true) & genres.name = ("' + req.body.genre + '") & rating > 80; sort rating desc;'
        };
    } else if (req.body.platform != null && req.body.multiplayer == true) {
        // all filters on
        options = {
        'method': 'POST',
        'url': 'https://api.igdb.com/v4/games/', // GAMES ENDPOINT
        'headers': {
            'Client-ID': 'yx9j15fb7kntnqe8xy0abmdfl04pnx',
            'Authorization': 'Bearer 425rln2zko3i9hhs1ybbyboi8vwa2c',
            'Content-Type': 'text/plain'
        },
        body: 'fields name, rating, genres.name, cover.*, platforms.name, multiplayer_modes.*; limit 10; where (multiplayer_modes.campaigncoop = true | multiplayer_modes.dropin = true | multiplayer_modes.lancoop = true | multiplayer_modes.offlinecoop = true | multiplayer_modes.onlinecoop = true | multiplayer_modes.splitscreen = true) & genres.name = ("' + req.body.genre + '") & rating > 0 & platforms.name = ("' + req.body.platform + '"); sort rating desc;'
        };
    } else {        
        // only genre filter
        options = {
        'method': 'POST',
        'url': 'https://api.igdb.com/v4/games/', // GAMES ENDPOINT
        'headers': {
            'Client-ID': 'yx9j15fb7kntnqe8xy0abmdfl04pnx',
            'Authorization': 'Bearer 425rln2zko3i9hhs1ybbyboi8vwa2c',
            'Content-Type': 'text/plain'
        },
        body: 'fields name, rating, cover.*; limit 10; where genres.name = ("' + req.body.genre + '") & rating > 80; sort rating desc;'
        };
    }

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


// LIST OF PLATFORMS
// "name": "Linux"
// "name": "Nintendo 64"
// "name": "Wii"
// "name": "PC (Microsoft Windows)"
// "name": "PlayStation"
// "name": "PlayStation 2"
// "name": "PlayStation 3"
// "name": "Xbox"
// "name": "Xbox 360"
// "name": "PC DOS"
// "name": "Mac"
// "name": "Commodore C64/128"
// "name": "Amiga"
// "name": "Nintendo Entertainment System (NES)"
// "name": "Super Nintendo Entertainment System (SNES)"
// "name": "Nintendo DS"
// "name": "Nintendo GameCube"
// "name": "Game Boy Color"
// "name": "Dreamcast"
// "name": "Game Boy Advance"
// "name": "Amstrad CPC"
// "name": "ZX Spectrum"
// "name": "MSX"
// "name": "Sega Mega Drive/Genesis"
// "name": "Sega 32X"
// "name": "Sega Saturn"
// "name": "Game Boy"
// "name": "Android"
// "name": "Sega Game Gear"
// "name": "Nintendo 3DS"
// "name": "PlayStation Portable"
// "name": "iOS"
// "name": "Wii U"
// "name": "N-Gage"
// "name": "Tapwave Zodiac"
// "name": "PlayStation Vita"
// "name": "Virtual Console (Nintendo)"
// "name": "PlayStation 4"
// "name": "Xbox One"
// "name": "3DO Interactive Multiplayer"
// "name": "Family Computer Disk System"
// "name": "Arcade"
// "name": "MSX2"
// "name": "Mobile"
// "name": "WonderSwan"
// "name": "Super Famicom"
// "name": "Atari 2600"
// "name": "Atari 7800"
// "name": "Atari Lynx"
// "name": "Atari Jaguar"
// "name": "Atari ST/STE"
// "name": "Sega Master System"
// "name": "Atari 8-bit"
// "name": "Atari 5200"
// "name": "Intellivision"
// "name": "ColecoVision"
// "name": "BBC Microcomputer System"
// "name": "Vectrex"
// "name": "Commodore VIC-20"
// "name": "Ouya"
// "name": "BlackBerry OS"
// "name": "Windows Phone"
// "name": "Apple II"
// "name": "Sharp X1"
// "name": "Sega CD"
// "name": "Neo Geo MVS"
// "name": "Neo Geo AES"
// "name": "Web browser"
// "name": "SG-1000"
// "name": "Donner Model 30"
// "name": "TurboGrafx-16/PC Engine"
// "name": "Virtual Boy"
// "name": "Odyssey"
// "name": "Microvision"
// "name": "Commodore PET"
// "name": "Bally Astrocade"
// "name": "Commodore 16"
// "name": "Commodore Plus/4"
// "name": "PDP-1"
// "name": "PDP-10"
// "name": "PDP-8"
// "name": "DEC GT40"
// "name": "Family Computer"
// "name": "Analogue electronics"
// "name": "Ferranti Nimrod Computer"
// "name": "EDSAC"
// "name": "PDP-7"
// "name": "HP 2100"
// "name": "HP 3000"
// "name": "SDS Sigma 7"
// "name": "Call-A-Computer time-shared mainframe computer system"
// "name": "PDP-11"
// "name": "CDC Cyber 70"
// "name": "PLATO"
// "name": "Imlac PDS-1"
// "name": "Microcomputer"
// "name": "OnLive Game System"
// "name": "Amiga CD32"
// "name": "Apple IIGS"
// "name": "Acorn Archimedes"
// "name": "Philips CD-i"
// "name": "FM Towns"
// "name": "Neo Geo Pocket"
// "name": "Neo Geo Pocket Color"
// "name": "Sharp X68000"
// "name": "Nuon"
// "name": "WonderSwan Color"
// "name": "SwanCrystal"
// "name": "PC-8801"
// "name": "TRS-80"
// "name": "Fairchild Channel F"
// "name": "PC Engine SuperGrafx"
// "name": "Texas Instruments TI-99"
// "name": "Nintendo Switch"
// "name": "Nintendo PlayStation"
// "name": "Amazon Fire TV"
// "name": "Philips Videopac G7000"
// "name": "Acorn Electron"
// "name": "Hyper Neo Geo 64"
// "name": "Neo Geo CD"
// "name": "New Nintendo 3DS"
// "name": "VC 4000"
// "name": "1292 Advanced Programmable Video System"
// "name": "AY-3-8500"
// "name": "AY-3-8610"
// "name": "PC-50X Family"
// "name": "AY-3-8760"
// "name": "AY-3-8710"
// "name": "AY-3-8603"
// "name": "AY-3-8605"
// "name": "AY-3-8606"
// "name": "AY-3-8607"
// "name": "PC-98"
// "name": "Turbografx-16/PC Engine CD"
// "name": "TRS-80 Color Computer"
// "name": "FM-7"
// "name": "Dragon 32/64"
// "name": "Amstrad PCW"
// "name": "Tatung Einstein"
// "name": "Thomson MO5"
// "name": "NEC PC-6000 Series"
// "name": "Commodore CDTV"
// "name": "Nintendo DSi"
// "name": "Windows Mixed Reality"
// "name": "Oculus VR"
// "name": "SteamVR"
// "name": "Daydream"
// "name": "PlayStation VR"
// "name": "Pokémon mini"
// "name": "PlayStation 5"
// "name": "Xbox Series X|S"
// "name": "Google Stadia"
// "name": "DUPLICATE Stadia"
// "name": "Exidy Sorcerer"
// "name": "Sol-20"
// "name": "DVD Player"
// "name": "Blu-ray Player"
// "name": "Zeebo"
// "name": "PC-FX"
// "name": "Satellaview"
// "name": "Game & Watch"
// "name": "Playdia"
// "name": "Evercade"
// "name": "Sega Pico"
// "name": "OOParts"
// "name": "Sinclair ZX81"
// "name": "Sharp MZ-2200"
// "name": "Epoch Cassette Vision"
// "name": "Epoch Super Cassette Vision"
// "name": "Plug & Play"
// "name": "Gamate"
// "name": "Game.com"
// "name": "Casio Loopy"
// "name": "Playdate"
// "name": "Intellivision Amico"
// "name": "Oculus Quest"
// "name": "Oculus Rift"
// "name": "Oculus Quest 2"
// "name": "Oculus Go"
// "name": "Gear VR"
// "name": "AirConsole"