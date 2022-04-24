//passport is used for authentification in express.
// we are using a local strategy (auth is handled by this server)
// we use jwt to
const passport = require('passport');
const passportJWT = require("passport-jwt");
const bcrypt = require('bcrypt');
var usersModel = require('./model/user');
const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async function (email, password, cb) {

    console.log("bxxx ===================")
    try {
      var user = await usersModel.findOne({
        where: {
          email: email
        }
      })
        .then(res => {
          return res;
        });


      if (!user) {
        return cb(null, false, { "success": false, "reason": 'email not found.' });
      }

      if (user.email_verified == false) {
        return cb(null, false, { "success": false, "reason": 'email not verified.' });
      }

      if (await bcrypt.compare(password, user.password)) {


        return cb(null, { id: user.id }, {
          message: 'Logged In Successfully'
        })
      } else {

        return cb(null, false, { "success": false, "reason": "You have entered an incorrect password" });
      }

    } catch (e) {

      return cb(e)
    }

  }
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
},
  async function (jwtPayload, cb) {


    // query postgres
    try {
      var res = await usersModel.findAll({
        where: {
          id: jwtPayload.id
        }
      }).then(res => {
        console.log("getUserById res" + JSON.stringify(res));
        return res;
      });

      return cb(null, res);
    } catch (e) {

      return cb(e)
    }

  }
));