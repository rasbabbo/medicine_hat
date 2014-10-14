// var express = require("express"),
//   bodyParser = require("body-parser"),
//   passport = require("passport"),
//   passportLocal = require("passport-local"),
//   cookieParser = require("cookie-parser"),
//   cookieSession = require("cookie-session"),
//   db = require("./models/index"),
//   flash = require('connect-flash'),
//   // methodoverride = require('method-override'),
//   request = require("request"),
//   app = express();


// // Middleware for ejs, grabbing HTML and including static files
// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({extended: false}) );




// var OAuth = require('oauth');
// var _ = require('lodash')

// var oauth = new OAuth.OAuth(
//   'https://api.twitter.com/oauth/request_token',
//   'https://api.twitter.com/oauth/access_token',
//   var key = process.env.TWITTER_KEY,
//   process.env.TWITTER_SECRET,
//   '1.0A',
//   null,
//   'HMAC-SHA1'
// );

// var searchURL="https://api.twitter.com/1.1/search/tweets.json?q=coffee&result_type=recent&lang=en";

// // oauth.get(searchURL, null, null, function(e, data, res) {
// //   var tweets = JSON.parse(data).statuses;
// //   var tweetText = _.pluck(tweets, "text")
// //   console.log(tweetText);
// //   console.log(typeof data)
// //   console.log(tweets.statuses)
// // });


// oauth.get(searchURL, null, null, function(e, data, res) {
//   var tweets= JSON.parse(data).statuses;
//   // var tweet = _.pluck(tweets, "text")
//   console.log(tweets);
//   // console.log(typeof data)
//   // console.log(tweets.statuses)


// });

// app.get('/search', function(req, res) {
//   var query = req.query.searchTerm;
//   var url = "http://api.brewerydb.com/v2/locations?&key=" + process.env.BREWERYDB + "&postalCode=" + query;
//   request (url, function (error, response, body) {
//     if (!error) {
//       var result = JSON.parse(body);
//       res.render("results.ejs", {beerLocation: result.data || []});
//       // var coordin = (data.latitude, data.longitude);
//       console.log("number of results: ", result.data ? result.data.length : "null");
//     }
//   });


// var url = "http://api.brewerydb.com/v2/locations?&key=" + process.env.BREWERYDB + "&postalCode=94107";

// app.get('/test', function(res, req) {
//   url, null, null, function(req, res) {
//   var results = JSON.parse(data);
//   console.log(results);
// });



