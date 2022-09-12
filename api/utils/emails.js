// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
require("dotenv").config();

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendAccesCode = (email, token ) => {
  const msg = {
    to: email,
    from: "empresa.test156@gmail.com", //no cambiar
    templateId: "d-157b9c9e6ef74682b491a4fadedbb499",
    dynamic_template_data: {
      link: `${process.env.CLIENT_URL}`,
      codigo: token
    },
  };
  sgMail
    .send(msg)
    .then(() => {})
    .catch((error) => {
      console.error(error);
    });
};

const sendResetPassEmail = (email, token) => {
  const msg = {
    to: email,
    from: "empresa.test156@gmail.com", //no cambiar
    templateId: "d-7a4d751ccb4a47d586ab6db18f8fb16b",
    dynamic_template_data: {
      //link: `${process.env.CLIENT_URL}/activate/${token}`,
      link: `${process.env.CLIENT_URL}`,
    },
  };
  sgMail
    .send(msg)
    .then(() => {})
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { sendResetPassEmail, sendAccesCode };
