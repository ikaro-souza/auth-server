import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import User from "./models/user.model.js";
import config from "../config.js";

export function ensureAuthorizationFactory() {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
  };

  const ensureAuthorizationStrategy = new Strategy(
    jwtOptions,
    async (payload, done) => {
      try {
        const user = await User.findById(payload.sub).exec();
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  );

  passport.use(ensureAuthorizationStrategy);
  return {
    create: () =>
      passport.authenticate("jwt", { session: false, failWithError: true }),
  };
}
