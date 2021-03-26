import "../utils.js";

export default class AuthValidator {
  static validateSignup({ body }) {
    if (body.email.isNullOrEmpty()) throw new EvalError("Email is required");
    if (body.password.isNullOrEmpty())
      throw new EvalError("Password is required");
  }

  static validateLogin({ body }) {
    if (body.email.isNullOrEmpty()) throw new EvalError("Email is required");
    if (body.password.isNullOrEmpty())
      throw new EvalError("Password is required");
  }
}
