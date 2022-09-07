const Users = require("../models/Users");
const bcrypt = require('bcrypt');
const { generateToken } = require("../middlewares/auth");


class AuthService {
  static async login(body) {
    try {
        const users = await Users.findOne({ email: body.email }, (erro, userDB)=>{
            if (erro) {
              return console.log(erro)
           }
       // Verifica que exista un usuario con el mail.
          if (!userDB) {
             return "Usuario o contraseña incorrectos"
           
          }
       // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
          if (! bcrypt.compareSync(body.password, userDB.password)){
             return console.log("Usuario o contraseña incorrectos")
                
             
          }
       // Genera el token de autenticación
       const {name, surname, email} = userDB
       generateToken({name, surname, email})
       })
       
      
    } catch (error) {
      console.error(error);
    }
  }



  static async logout(body) {
   
  }
}

module.exports = AuthService;