const nodemailer = require("nodemailer")

var emailService = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  /*auth: {
    user:,
    pass: 
  }*/
})

  module.exports = emailService