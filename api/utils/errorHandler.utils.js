const errorHandler = (code, returnData) => {
  const errorCodes = [
    {
      message: "No se encontraron usuarios",
      returnData,
    },
    {
      message: "User ID incorrecto",
      returnData,
    },
    {
      message: "Campo incorrecto, no se realizaron modificaciones",
      returnData,
    },
    {
      message: "Token Incorrecto",
    },
    {
      message: "Contraseña Incorrecta",
    },
  ];
  return errorCodes[code];
};

module.exports = errorHandler;
