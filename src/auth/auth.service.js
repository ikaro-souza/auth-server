import jwt from "jwt-simple";
import AuthError from "./auth.error.js";
import User from "./models/user.model.js";
import config from "../config.js";

export default class AuthService {
  static async signup({ email, password }) {
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) throw new AuthError("Email already in use", 409);

    const user = new User({ email, password });
    await user.save();
    return generateUserToken(user);
  }

  static async login({ email, password }) {
    const user = await User.findOne({ email }).exec();
    if (!user) throw new AuthError("Email not registered", 404);

    const isCorrectPassword = user.comparePassword(password);
    if (!isCorrectPassword) throw new AuthError("Wrong password", 401);

    return generateUserToken(user);
  }
}

const generateUserToken = (user) => {
  return jwt.encode(
    {
      sub: user.id,
      iat: Date.now(),
    },
    config.secret
  );
};
