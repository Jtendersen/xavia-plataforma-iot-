const AuthService = require("../services/auth.services");
class AuthController {
  static async me(req, res) {
    try {
      res.send(req.user);
    } catch (error) {
      return console.log(error);
    }
  }

  static async login(req, res) {
    try {
      const user = await AuthService.login(req.body);

      // Genera el token de autenticación
      if (user.name) {
        const { name, surname, email } = user;
        const token = generateToken({ name, surname, email });
        res.cookie("token", token);
      }

      return res.status(201).send(user);
    } catch (error) {
      return console.log(error);
    }
  }
  static async logout(req, res) {
    try {
      res.clearCookie("token");
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
    }
  }

  static async forgotPassword(req, res) {
    try {
      const message = await AuthService.forgotPassword(req.body);
      return res.status(200).send(message);
    } catch (error) {
      console.log(error);
    }
  }

  static async resetPassword(req, res) {
    try {
      const message = await AuthService.resetPassword(req.body);
      return res.status(200).send(message);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AuthController;
