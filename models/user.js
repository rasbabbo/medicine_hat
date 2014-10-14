var bcrypt = require('bcrypt');
var passport = require('passport');
var passportLocal = require('passport-local');
var salt = bcrypt.genSaltSync(10);

module.exports = function (sequelize, Datatypes) {  
  var User = sequelize.define('user', {
    username : {
      type: Datatypes.STRING,
      unique: true,
      allowNull: false,
      validate: { len: [6, 30]}
    },
    password: Datatypes.STRING,
    firstname: Datatypes.STRING,
    lastname: Datatypes.STRING,
    email: Datatypes.STRING
  },

  {
  classMethods: {
    encryptPass: function (password) {
      console.log("salt", salt);
      var hash = bcrypt.hashSync(password, salt);
      return hash;
    },
    comparePass: function(userpass, dbpass) {
      return bcrypt.compareSync((userpass), dbpass);
    },
    createNewUser: function(username, password, firstname, lastname, email, err, success) {
      if (password.length < 6) {
        err({message: "Gotta make a longer password"});
      }
      else {
        User.findOrCreate({
          username: username,
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: this.encryptPass(password)
        }).error(function(error) {
          console.log(error);
          if(error.username) {
          err({message: 'User name must be at least 6 letters', username: username});
          } else {
            err({message: "Already existing account", username: username});
          }
        }).success(function(user) {
          success({message: "OK, you got your account, log in"});
          });
        }//ends else statement

      },
    }//completes class method
  }
  ); 
//};

passport.use(new passportLocal.Strategy ({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback : true
},

function(req, username, password, done) {
  User.find ({
    where: {
      username: username
    }
  })

  .done(function(error, user) {
    if(error) {
      console.log(error);
      return done (err, req.flash('loginMessage', 'Somethings is broke'));
    }
    if (user === null) {
      return done (null, false, req.flash('loginMessage', 'No be no username.'));
    }
    if ((User.comparePass(password, user.password)) !== true) {
      return done(null, false, req.flash('loginMessage', 'Bad Password'));
    }
    done(null, user);
  });
}));

return User;
};

