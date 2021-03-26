import AuthValidator from "./auth.validator.js";
import AuthService from "./auth.service.js";

export default class AuthController {
  async signup(req, res) {
    try {
      AuthValidator.validateSignup(req);
      const token = await AuthService.signup(req.body);

      res.status(201).json({
        sucess: true,
        data: token,
      });
    } catch (error) {
      const status = error.status || error.code || 500;
      const message =
        status === 500 ? "An unexpected error ocurred" : error.message;

      res.status(status).send({
        success: false,
        message,
      });
    }
  }

  async login(req, res) {
    try {
      AuthValidator.validateLogin(req);
      const token = await AuthService.login(req.body);

      res.json({
        success: true,
        data: token,
      });
    } catch (error) {
      const code = error.status || error.code || 500;
      res.status(code).json({
        success: false,
        message: code === 500 ? "An unexpected error ocurred" : error.message,
      });
    }
  }
}
