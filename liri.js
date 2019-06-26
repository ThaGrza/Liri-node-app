require("dotenv").config();

var axios = require("axios");
var keys = require("./keys.js");
var fs = require("fs");

var Spotify = require("node-spotify-api");
var spotify = new Spotify ({
    id: "6dd0566a11204578abd841fd17a3f1fc",
    secret: "feb2d844093748839afbbe6b2fd9ff16"
});

// var userChoice = "";
var userChoice = process.argv.slice(3);
// var queryUrl = "http://www.omdbapi.com/?t=" + userChoice + "&y=&plot=short&apikey=trilogy";

// console.log(userChoice);


// LOGIC FOR MOVIES -----------------------------------------------------------
if (process.argv[2] === "movie-this" && userChoice !==''){
    var queryUrl = "http://www.omdbapi.com/?t=" + userChoice + "&y=&plot=short&apikey=trilogy";
    getMovie(queryUrl);
} else if (process.argv[2] === "movie-this" && userChoice ==''){
    var queryUrl = "http://www.omdbapi.com/?t='Mr.Nobody'&y=&plot=short&apikey=trilogy";
};
function getMovie (queryUrl){
    axios.get(queryUrl).then(
        function(response) {
            console.log("Title: " + response.data.Title);
            console.log("Actors: " + response.data.Actors);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Metascore);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
        })
}
// LOGIC FOR SPOTIFY----------------UNFINISHED----------------------------
if (process.argv[2] === "spotify-this-song" && userChoice !==''){
    getSong();
};

function getSong(){
    spotify.search({ type: 'track', query: userChoice, limit: 1}, function(err, response) {
    var spotifyArr = response.tracks.items;
    for (var i = 0; i < spotifyArr.length; i++){
        console.log("Artist: ", response.tracks.items[i].album.artists[0].name);
        console.log("Song: ", response.tracks.items[i].name);
        console.log("Album: ", response.tracks.items[i].album.name);
        console.log("Spotify Link: ", response.tracks.items[i].external_urls.spotify);
    }
    });
};


// LOGIC FOR CONCERT EVENT INFO------------------------------------------------------------
if (process.argv[2] === "concert-this" && userChoice !==''){
    var queryUrl = "https://rest.bandsintown.com/artists/" + userChoice + "/events?app_id=codingbootcamp";
    getConcert();

}

function getConcert (queryUrl){
    axios.get(queryUrl).then(
        function(response) {
            console.log(response);
            
        })
}

if (process.argv[2] === "do-what-it-says" && userChoice !==''){
    fs.readFile("random.txt", "utf8", function(error, data){
        userChoice = "I Want it That Way";
        getSong();
  
    });
}


