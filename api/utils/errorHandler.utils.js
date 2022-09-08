const errorHandler = (code, returnData) => {
  const errorCodes = [
    {
      message: "No Users Found",
      returnData,
    },
    {
      message: "Wrong User ID",
      returnData,
    },
    {
      message: "Incorrect field, no modifications has been made",
      returnData,
    },
    {
      message: "Incorrect Token",
    },
  ];
  return errorCodes[code];
};

module.exports = errorHandler;
