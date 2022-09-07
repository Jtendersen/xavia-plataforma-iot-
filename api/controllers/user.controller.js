const UserService = require("../services/user.services");

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
      if (!users) return res.status(404).send("Users not found");
      return res.status(200).send(users);
    } catch (error) {
      console.log(error);
    }
  }

  static async getUser(req, res) {
    try {
      const user = await UserService.getUser(req.params.id);
      if (!user) return res.status(404).send("User not found");
      return res.status(200).send(user);
    } catch (error) {
      console.log(error);
    }
  }

  static async userModify(req, res) {
    try {
      const user = await UserService.userModify(req.body);
      return res.status(204).send(user);
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

}

module.exports = UserController;
