const AuthService = require("../services/auth.services");

class AuthController {
  static async login(req, res) {
    try {
      const user = await AuthService.login(req.body);
      return res.status(201).send(user);
    } catch (error) {
      console.log(error);
    }
  }
  static async logout(req, res) {
    try {
      const user = await AuthService.logout(req.body);
      return res.status(201).send(user);
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = AuthController;