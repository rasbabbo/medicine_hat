var express = require("express"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  passportLocal = require("passport-local"),
  cookieParser = require("cookie-parser"),
  cookieSession = require("cookie-session"),
  db = require("./models/index"),
  flash = require('connect-flash'),
  // methodoverride = require('method-override'),
  request = require("request"),
  app = express();


// Middleware for ejs, grabbing HTML and including static files
app.use(express.static(__dirname+"/public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}) );
// app.use(methodoverrride()); 

// we are going to create a cookie that will store our session data
// ideally we want this secret to be a string of random numbers 
// we use the secret to parse the data from the cookie
// This is cookie-based session middleware so technically this creates a session
// This session can expire and doesn't live on our server

// The session middleware implements generic session functionality with in-memory storage by default. It allows you to specify other storage formats, though.
// The cookieSession middleware, on the other hand, implements cookie-backed storage (that is, the entire session is serialized to the cookie, rather than just a session key. It should really only be used when session data is going to stay relatively small.
// And, as I understand, it (cookie-session) should only be used when session data isn't sensitive. It is assumed that a user could inspect the contents of the session, but the middleware will detect when the data has been modified.
app.use(cookieSession( {
  secret: 'thisismysecretkey',
  name: 'session with cookie data',
  // this is in milliseconds
  maxage: 1000000
  })
);

// get passport started

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// prepare our serialize functions
passport.serializeUser(function(user, done){
  console.log("SERIALIZED JUST RAN!");
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  console.log("DESERIALIZED JUST RAN!");
  db.user.find({
      where: {
        id: id
      }
    })
    .done(function(error,user){ 
      done(error, user);
    });
});



app.get('/home', function(req, res) {
 res.render('home'); 
});


app.get('/signup', function(req,res){
  if(!req.user) {
    res.render("signup", { username: ""});
  }
  else{
    res.redirect('/');
  }
});

app.get('/', function(req, res) {
  res.render('search');
});

app.post('/signup', function(req,res){  
  db.user.createNewUser(req.body.username, 
    req.body.password, req.body.firstname, 
    req.body.lastname, req.body.email,  
  function(err){
    res.render('/signup', {message: err.message, 
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email
    });
  }, 
  function(success){
    res.redirect('/', {message: success.message});
  });
});


app.get('/login', function(req,res){
  if(!req.user) {
    res.render('login', {message: req.flash('loginMessage'), username: ""});
  }
  else{
    res.redirect('/');
  }
});

app.get('/', function(req, res) {
  res.render('search');
});

app.get('/search', function(req, res) {
  var query = req.query.searchTerm;
  var url = "http://api.brewerydb.com/v2/locations?&key="+process.env.BREWERYDB+"&locality="+query;
  request (url, function (error, response, body) {
    if (!error) {
      var result = JSON.parse(body);


      var featuresArray = [];


      for (var i = 0; i < result.data.length; i++) {
      
        var newObj = {
          type: 'Feature',
          properties: {
            title: result.data[i].brewery.name,
            url: result.data[i].brewery.website,
          'marker-color': '#F0B943',
          'marker-size': 'large',
          'marker-symbol': 'star',
          },
          geometry : {
            type: 'Point',
            coordinates: [result.data[i].longitude, result.data[i].latitude]
          }
        };
        featuresArray.push(newObj);
        
        console.log("THIS IS FEATURES ARRAY");
        console.log(featuresArray[i].geometry.coordinates[0]);
        console.log(featuresArray[i].geometry.coordinates[1]);
        

      }
      var blah = JSON.parse(JSON.stringify(featuresArray));
      res.render("results.ejs", {
        beerLocation: result.data || [],
        features: blah
      });

    }
  });
});






app.get('/', function(req,res){
  res.render('/', {
  //runs a function to see if the user is authenticated - returns true or false
  isAuthenticated: req.isAuthenticated(),
  //this is our data from the DB which we get from deserializing
  user: req.user
  });
});

// authenticate users when logging in - no need for req,res passport does this for us
app.post('/login', passport.authenticate('local', {
  successRedirect: '/', 
  failureRedirect: '/login', 
  failureFlash: true
}));


app.get('/logout', function(req,res){
  //req.logout added by passport - delete the user id/session
  req.logout();
  res.redirect('/home');
});

// catch-all for 404 errors 
app.get('*', function(req,res){
  res.status(404);
  res.render("signup");
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Brewing Beer on 3000");  
});   

// app.get('/search', function(req, res) {
//   var query = req.query.searchTerm;
//   var url = "http://api.brewerydb.com/v2/locations?&key=" + process.env.BREWERYDB + "&postalCode=" + query;
//   request (url, function (error, response, body) {
//     if (!error) {
//       var result = JSON.parse(body);
//       res.render("results.ejs", {beerLocation: result.data|| []});
//       push(data.latitude, data.longitude);
//       console.log(coordin)
//       // console.log(data);
//     }
//   });
// });

// on submit, create a new users using form values
// app.post('/signup', function(req,res){  
//   db.user.createNewUser(req.body.username, 
//     req.body.password, req.body.firstname, 
//     req.body.lastname, req.body.password,  
//   function(err){
//     res.render("/signup", {message: err.message, 
//       username: req.body.username,
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       email: req.body.email
//     });
//   }, 
//   function(success){
//     res.render("/search", {message: success.message});
//   });
// });


// app.get('/', function(req,res){
//   // check if the user is logged in
//   if(!req.user) {
//     res.render("index");
//   }
//   else{
//     res.redirect('/home');
//   }
// });



