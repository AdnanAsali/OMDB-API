var express = require("express");
var app = express();
var request = require("request");
var movieData;

// app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


app.get("/", function(req, res) 
{
    res.render("home");
});


app.get("/movieInfo", function(req, res)
{
    var query = req.query.wantedMovie;
    var url = "http://www.omdbapi.com/?s=";
    var key = "&apikey=thewdb";
    request(url + query + key, function(error, response, body)
    {
        if(!error && response.statusCode == 200)
        {
            var movieData = JSON.parse(body);
            // response.render("movieInfo", {movieData: movieData});
            // res.send(movieData["Title"]);
            res.render("movieInfo", {movieData: movieData});
            console.log(movieData);
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function()
{
    console.log("Movie search has started !");
});

