const nodemailer = require('nodemailer');
const envsConfigs = require('../configs/envsConfigs');

const transporter = nodemailer.createTransport({
  //   host: 'smtp.gmail.com',
  //   port: 465,
  host: 'gmail',
  auth: {
    user: envsConfigs.email,
    pass: envsConfigs.emailPass,
  },
});

const sendEmail = async data => {
  const email = { ...data, from: envsConfigs.email };
  await transporter.sendMail(email);
  return true;
};

module.exports = sendEmail;
