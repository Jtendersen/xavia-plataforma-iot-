const UserService = require("../services/user.services");
const errorHandler = require("../utils/errorHandler.utils");

class UserController {
  static async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      return res.status(201).send(user);
    } catch (error) {
      console.log(error);
    }
  }

  static async signupToken(req, res) {
    try {
      const user = await UserService.signupToken(req.body);
      if (!user) return res.status(400).send(errorHandler(0, user));
      if (user === 400) return res.status(400).send(errorHandler(3));
      return res.status(201).send(user);
    } catch (error) {
      console.log(error);
    }
  }

  static async newPassword(req, res) {
    try {
      const user = await UserService.newPassword(req.body);
      return res.status(201).send(user);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      if (!users) return res.status(404).send(errorHandler(0, users));
      return res.status(200).send(users);
    } catch (error) {
      console.log(error);
    }
  }

  static async getUser(req, res) {
    try {
      const user = await UserService.getUser(req.params.id);
      if (!user) return res.status(404).send(errorHandler(0, user));
      return res.status(200).send(user);
    } catch (error) {
      console.log(error);
    }
  }

  static async findByName(req, res) {
    try {
      const user = await UserService.findByName(req.params.search);
      return user.length === 0
        ? res.status(404).send(errorHandler(0, user))
        : res.status(200).send(user);
    } catch (error) {
      console.log(error);
    }
  }

  static async userModify(req, res) {
    try {
      const user = await UserService.userModify(req.body);
      if (user.modifiedCount > 0) return res.status(200).send(user);
      return user.matchedCount == 0
        ? res.status(404).send(errorHandler(1, user))
        : res.status(400).send(errorHandler(2, user));
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUser(req, res) {
    try {
      const user = await UserService.deleteUser(req.params.id);
      return res.status(204).send(user);
    } catch (error) {
      console.log(error);
    }
  }

  static async createAdmin(req, res) {
    try {
      const user = await UserService.createAdmin(req.body);
      return res.status(201).send(user);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
