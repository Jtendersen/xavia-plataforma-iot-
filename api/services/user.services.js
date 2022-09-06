const Users = require("../models/Users");

class UserService {
  static async createUser(body) {
    try {
      const user = new Users(body);
      return await user.save();
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = UserService;
