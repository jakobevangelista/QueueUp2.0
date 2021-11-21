var request = require('request');
module.exports = (req,res) => {
// retrieve the attributes of the given games & find the most closely corresponding games
var options = {
    'method': 'POST',
    'url': 'https://api.igdb.com/v4/games/', // GAMES ENDPOINT
    'headers': {
        'Client-ID': 'yx9j15fb7kntnqe8xy0abmdfl04pnx',
        'Authorization': 'Bearer ccappafd8ac20qkclxalotj1yh0mbh',
        'Content-Type': 'text/plain'
    },
    body: 'fields *, name, themes, similar_games.name; limit 500; where name = "' + req.body.name1 + '" | name = "' + req.body.name2 + '";'
};

// send request
var resp;
var keywordArray = [];
var tagArray = [];
var themeArray = [];
var genreArray = [];
var simGamesOne = [];
var simGamesTwo = [];
request(options, function (error, response) {
    if (error) {
        throw new Error(error);
    }
    // parse response
    resp = JSON.parse(response.body);
    // console.log(resp); // print response

    // Get similar games from IGDB
    // console.log("\n Games similar to " + name1 + "\n*********************");
    for (var i in resp[0].similar_games) {
        var simGames1 = resp[0].similar_games[i].name;
        // console.log(simGames1);
        simGamesOne.push(simGames1);
    }
    // console.log("\n Games similar to " + name2 + "\n*********************");
    for (var i in resp[1].similar_games) {
        var simGames2 = resp[1].similar_games[i].name;
        // console.log(simGames2);
        simGamesTwo.push(simGames2);
    }

    // Get similar keywords
    if (!(resp[0].keywords === undefined) && !(resp[1].keywords === undefined)){
        keywordArray = resp[0].keywords.filter(value => resp[1].keywords.includes(value));
        if (keywordArray.length != 0) {
            console.log("\n Array of Similar Keywords \n*********************");
            console.dir(keywordArray, {'maxArrayLength': null});
        } else { console.log("\n No Similar Keywords \n"); }
    } else { console.log("\n No Similar Keywords \n"); }

    // Get similar tags
    if (!(resp[0].tags === undefined) && !(resp[1].tags === undefined)){
        tagArray = resp[0].tags.filter(value => resp[1].tags.includes(value));
        if (tagArray.length != 0) {
            console.log("\n Array of Similar Tags \n*********************");
            console.dir(tagArray, {'maxArrayLength': null});
        } else { console.log("\n No Similar Tags \n"); }
    } else { console.log("\n No Similar Tags \n"); }

    // Get similar Themes
    if (!(resp[0].themes === undefined) && !(resp[1].themes === undefined)){
        themeArray = resp[0].themes.filter(value => resp[1].themes.includes(value));
        if (themeArray.length != 0) {
            console.log("\n Array of Similar Themes \n*********************");
            console.dir(themeArray, {'maxArrayLength': null});
        } else { console.log("\n No Similar Themes \n"); }
    } else { console.log("\n No Similar Themes \n"); }

    // Get similar Genres
    if (!(resp[0].genres == undefined) && !(resp[1].genres == undefined)){
        genreArray = resp[0].genres.filter(value => resp[1].genres.includes(value));
        if (genreArray.length != 0) {
            console.log("\n Array of Similar Genres \n*********************");
            console.dir(genreArray, {'maxArrayLength': null});
        } else { console.log("\n No Similar Genres \n"); }
    } else { console.log("\n No Similar Genres \n"); }


    // Turn arrays into strings
    var keyList = "(" + keywordArray.join() + ")";
    var tagList = "(" + tagArray.join() + ")";
    var themeList = "(" + themeArray.join() + ")";
    var genreList = "(" + genreArray.join() + ")";

    if (keywordArray.length == 0 && tagArray.length == 0 && themeArray.length == 0 && genreArray.length == 0) {
        // 0000
        console.log("\nComing soon...");
    } else if (keywordArray.length == 0 && tagArray.length == 0 && themeArray.length == 0 && genreArray.length != 0) {
        // 0001
        options.body = 'fields name, cover.*, total_rating; limit 10; where tags = ' + ' & genres = ' + genreList + ' & total_rating > 90; sort total_rating desc;';
    } else if (keywordArray.length == 0 && tagArray.length == 0 && themeArray.length != 0 && genreArray.length == 0) {
        // 0010
        options.body = 'fields name, cover.*, total_rating; limit 10; where themes = ' + themeList + ' & total_rating > 90; sort total_rating desc;';
    } else if (keywordArray.length == 0 && tagArray.length == 0 && themeArray.length != 0 && genreArray.length != 0) {
        // 0011
        options.body = 'fields name, cover.*, total_rating; limit 10; where themes = ' + themeList + ' & genres = ' + genreList + ' & total_rating > 90; sort total_rating desc;';
    } else if (keywordArray.length == 0 && tagArray.length != 0 && themeArray.length == 0 && genreArray.length == 0) {
        // 0100
        options.body = 'fields name, cover.*, total_rating; limit 10; where tags = ' + tagList + ' & total_rating > 90; sort total_rating desc;';
    } else if (keywordArray.length == 0 && tagArray.length != 0 && themeArray.length == 0 && genreArray.length != 0) {
        // 0101
        options.body = 'fields name, cover.*, total_rating; limit 10; where tags = ' + tagList + ' & genres = ' + genreList + ' & total_rating > 90; sort total_rating desc;';
    } else if (keywordArray.length == 0 && tagArray.length != 0 && themeArray.length != 0 && genreArray.length == 0) {
        // 0110
        options.body = 'fields name, cover.*, total_rating; limit 10; where tags = ' + tagList + ' & themes = ' + themeList + ' & total_rating > 90; sort total_rating desc;';
    } else if (keywordArray.length == 0 && tagArray.length != 0 && themeArray.length != 0 && genreArray.length != 0) {
        // 0111
        options.body = 'fields name, cover.*, total_rating; limit 10; where themes = ' + themeList + ' & total_rating > 90 & tags = ' + tagList + ' & genres = ' + genreList + '; sort total_rating desc;';
    } else if (keywordArray.length != 0 && tagArray.length == 0 && themeArray.length == 0 && genreArray.length == 0) {
        // 1000
        options.body = 'fields name, cover.*, total_rating; limit 10; where keywords = ' + keyList + ' & total_rating > 90; sort total_rating desc;';
    } else if (keywordArray.length != 0 && tagArray.length == 0 && themeArray.length == 0 && genreArray.length != 0) {
        // 1001
        options.body = 'fields name, cover.*, total_rating; limit 10; where keywords = ' + keyList + ' & genres = ' + genreList + ' & total_rating > 90; sort total_rating desc;';
    } else if (keywordArray.length != 0 && tagArray.length == 0 && themeArray.length != 0 && genreArray.length == 0) {
        // 1010
        options.body = 'fields name, cover.*, total_rating; limit 10; where keywords = ' + keyList + ' & themes = ' + themeList + ' & total_rating > 90; sort total_rating desc;';
    } else if (keywordArray.length != 0 && tagArray.length == 0 && themeArray.length != 0 && genreArray.length != 0) {
        // 1011
        options.body = 'fields name, cover.*, total_rating; limit 10; where keywords = ' + keyList + ' & themes = ' + themeList + ' & genres = ' + genreList + ' & total_rating > 90; sort total_rating desc;';
    } else if (keywordArray.length != 0 && tagArray.length != 0 && themeArray.length == 0 && genreArray.length == 0) {
        // 1100
        options.body = 'fields name, cover.*, total_rating; limit 10; where keywords = ' + keyList + ' & tags = ' + tagList + ' & total_rating > 90; sort total_rating desc;';
    } else if (keywordArray.length != 0 && tagArray.length != 0 && themeArray.length == 0 && genreArray.length != 0) {
        // 1101
        options.body = 'fields name, cover.*, total_rating; limit 10; where keywords = ' + keyList + ' & tags = ' + tagList + ' & genres = ' + genreList + ' & total_rating > 90; sort total_rating desc;';
    } else if (keywordArray.length != 0 && tagArray.length != 0 && themeArray.length != 0 && genreArray.length == 0) {
        // 1110
        options.body = 'fields name, cover.*, total_rating; limit 10; where keywords = ' + keyList + ' & tags = ' + tagList + ' & themes = ' + themeList + ' & total_rating > 90; sort total_rating desc;';
    } else if (keywordArray.length != 0 && tagArray.length != 0 && themeArray.length != 0 && genreArray.length != 0) {
        // 1111
        options.body = 'fields name, cover.*, total_rating; limit 10; where keywords = ' + keyList + ' & tags = ' + tagList + ' & themes = ' + themeList + ' & genres = ' + genreList + ' & total_rating > 90; sort total_rating desc;';
    } else {
        console.log("Broken Algorithm");
        return -1;
    }

    request(options, function (error, response) {
        if (error) {
            throw new Error(error);
        }
        // parse response
        resp = JSON.parse(response.body);
        // console.log(resp); // print response
    
        var finalData = [];
        for (var i in resp) {
            var coverJSON = resp[i].cover;
            var name = resp[i].name;
            var img = coverJSON.url;
            var img = img.replace("thumb", "1080p")
            // push the name and cover url of each game onto the final data array
            finalData.push([name, img]); 
        }
    
        console.log(finalData);
        // return finalData;
        res.send(finalData).status(200)
        });
    });
}