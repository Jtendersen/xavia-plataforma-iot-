const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRET;
const EXPIRES = process.env.TOKEN_EXPIRES;

// Genera un token al usuario que se logueo.
const generateToken = (payload) => {
  const token = jwt.sign({ user: payload }, SECRET, { expiresIn: EXPIRES });
  return token;
};

// Verifica el token y comprueba si el SECRET coincide.
const validateToken = (token) => {
  return jwt.verify(token, SECRET, (error, data) => {
    if (error) return null;
    return data;
  });
};

// Valida que el token del usuario sea el correcto.
const validateAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);

  req.user = user;

  next();
};

module.exports = { generateToken, validateToken, validateAuth };
