const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/userModel");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey = process.env.PASSPORT_JWT_SECRETE;

passport.serializeUser((user, done) => {
  console.log("serialize");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id).exec();
  console.log("deserialize");
  console.log(user);
  done(null, user);
});

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id).exec();
      if (user) return done(null, user);
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRETE,
      callbackURL: `${process.env.BACKEND}/api/v1/auth/google/redirect`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("strategy");
        const user = await User.findOne({ googleID: profile.id }).exec();
        if (user) {
          done(null, user);
        } else {
          const newUser = await User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleID: profile.id,
          });
          done(null, newUser);
        }
      } catch (err) {
        done(err, false);
      }
    }
  )
);
