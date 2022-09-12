const Users = require("../models/Users");
const { sendAccesCode } = require("../utils/emails");

class UserService {
  static async createUser({fullname, empresa, cuit, email,phone, imgUrl}) {
    try {
      const token = Math.floor(Math.random() * 99999);
      const user = new Users(
        {
          fullname,
          empresa,
          cuit,
          email,
          phone,
          roles: ["user"],
          activationCode:token,
          imgUrl
        }
      );
      sendAccesCode(email,token)
      return await user.save();
    } catch (error) {
      console.error(error);
    }
  }

  static async signupToken({email, token}) {
    try {
      const user = await Users.findOne({ email: email, status: true });
      if (!user) return;
      if (token === user.activationCode && !user.isActivated) {
        
        return user;
      } else return 400;
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

  static async findByName(search) {
    try {
        return await Users.find({
            $or: [
                { fullname: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ],
        }).exec()
    } catch (error) {
        console.log(error)
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
  static async createAdmin({fullname, email, password}) {
    try {
      const token = Math.floor(Math.random() * 99999);
      const user = new Users(
        {
          fullname,
          password,
          email,
          isActivated:true,
          roles:["admin"]
        }
      );

      return await user.save();
    } catch (error) {
      console.error(error);
    }
  }

}

module.exports = UserService;
