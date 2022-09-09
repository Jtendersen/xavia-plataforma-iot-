const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const { SendResetPassEmail } = require("../utils/emails");
const { generateToken, validateToken } = require("../middlewares/auth");

class AuthService {
  static async login(body) {
    console.log("ESTE ES EL BODY", body);
    try {
      const user = await Users.findOne({ email: body.email });

      // Verifica que exista un usuario con el mail.
      if (!user) return "Usuario o contraseña incorrectos";

      // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
      if (!bcrypt.compareSync(body.password, user.password)) {
        return "Usuario o contraseña incorrectos";
      }
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  static async forgotPassword(body) {
    try {
      const user = await Users.findOne({ email: body.email });

      if (!user) return "No existe un usuario con ese email";
      const token = generateToken(user._id);

      //Setea un token provisorio en el modelo de User y le envia un mail al usuario vinculado a ese token.

      await Users.findOneAndUpdate(
        { _id: user._id },
        { $set: { resetLink: token } }
      );
      //SendResetPassEmail(user.email, token);

      return "Se le ha enviado un email para recuperar su contrasena";
    } catch (error) {
      console.error(error);
    }
  }

  static async resetPassword({ resetLink, newPassword }) {
    if (resetLink) {
      try {
        //valida que el token recibido sea correcto y que no haya expirado
        const validatedUser = await validateToken(resetLink);
        if (!validatedUser) return "Su token ya expiro o es incorrecto";

        //encuentra al usuario que coincide con ese token
        const user = await Users.findOne({ _id: validatedUser.user });
        if (!user) return "No existe un usuario con este token";

        //compara si el token del modelo de User coincide con el token recibido por parametro y setea contrasena
        if (resetLink === user.resetLink) {
          user.password = newPassword;
          user.resetLink = null;
          return user.save();
        } else return "Token Incorrecto";
      } catch (error) {
        console.error(error);
      }
    } else return "Usted no posee un token";
  }
}

module.exports = AuthService;
