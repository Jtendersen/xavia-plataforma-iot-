const path = require("path");

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Xavia IOT",
      version: "1.0.0",
      description: "Api xavia",
      contact: {
        email: "empresa.test156@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Local Dev",
      },
    ],
  },
/*   apis: [`${path.join(__dirname,"/routes/*.js")}`], */
  apis:["api/routes/*.js"]
};
module.exports = swaggerSpec;
