const passport = require("passport");
const User = require("../models/User");
const strategy = require("passport-facebook").Strategy;
module.exports = passport.use(
  new strategy(
    {
      clientID: "386388956791325",
      clientSecret: "ff53944b4ffb711a2165fa5b1f7a4ecd",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos"],
    },
    (token, refreshToken, profile, done) => {
      User.findOne({ userId: profile.id }, (err, user) => {
        if (user) {
          done(null, user);
        } else {
          User.create({
            userId: profile.id,
            name: profile.displayName,
            avatar: profile._json.picture.data.url,
          });
        }
      });
    }
  )
);
