const Users = require("../models/Users");

class UserService {
  static async createUser(body) {
    try {
      const token = Math.floor(Math.random() * 99999);
      const user = new Users(body);
      user.activationCode = token;
      return await user.save();
    } catch (error) {
      console.error(error);
    }
  }

  static async signupToken({email, token}) {
    try {
      const user = await Users.findOne({ email: email, status: true });
      if (!user) return "No user Found";
      if (token === user.activationCode) {
        return user;
      } else return "Wrong token";
    } catch (error) {
      console.error(error);
    }
  }

  static async newPassword({email, token, password}) {
    try {
      const user = await Users.findOne({ email: email, status: true });
      if (!user) return "No user Found";
      if (token === user.activationCode) {
        user.isActivated = true;
        user.password = password;
        user.activationCode = 0;
        return user.save();
      } else return "Wrong token";
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllUsers() {
    try {
      return await Users.find({}).sort({ username: 1 });
    } catch (error) {
      console.log(error);
    }
  }
  static async getUser(id) {
    try {
      return await Users.findOne({ _id: id });
    } catch (error) {
      console.log(error);
    }
  }

  static async userModify(body) {
    try {
      return await Users.updateOne({ _id: body.id }, { $set: body.mod });
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteUser(id) {
    try {
      return await Users.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserService;
