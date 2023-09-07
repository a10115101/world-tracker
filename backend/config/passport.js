const { JwtStrategy } = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt").ExtractJwt;

const User = require("../models/userModel");

module.exports = (passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.PASSPORT_JWT_SECRETE;

  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      console.log(jwtPayload);

      try {
        const user = await User.findOne({ _id: jwtPayload._id }).exec();

        if (user) return done(null, user);

        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
