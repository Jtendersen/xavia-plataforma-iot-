const { generateToken } = require("../middlewares/auth");
const AuthService = require("../services/auth.services");
const errorHandler = require("../utils/errorHandler.utils");

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
      if (user === 404) return res.status(404).send(errorHandler(0, user));
      if (user === 401) return res.status(401).send(errorHandler(4));
      if (user === 402) return res.status(401).send(errorHandler(3));
      // Genera el token de autenticación
      if (user.isActivated) {
        const { fullname, email, isActivated, imgUrl } = user;
        const token = generateToken({ fullname, email, isActivated, imgUrl });
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
