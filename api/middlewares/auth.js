const jwt = require("jsonwebtoken");
require('dotenv').config()

const SECRET = process.env.SECRET
const EXPIRES = process.env.TOKEN_EXPIRES

// Middleware para generar un token al usuario que se logueo.
const generateToken = (payload) => {
  const token = jwt.sign({ user: payload }, SECRET, { expiresIn: EXPIRES });
  return token;
};

// Middleware para verificar el token y comprobar si el SECRET coincide.
const validateToken = (token) => {
  return jwt.verify(token, SECRET);
};

// Middleware para validar que el token del usuario sea el correcto.
const validateAuth = (req, res, next)=> {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);
  
    const { user } = validateToken(token);
    if (!user) return res.sendStatus(401);
    console.log(user)
  
    req.user = user;
  
    next();
  }
  


module.exports = { generateToken, validateToken, validateAuth};