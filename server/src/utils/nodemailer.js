const nodemailer = require("nodemailer")

var emailService = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'enbis95@gmail.com',
    pass: 'Ganimet0022!'
  }
})

  module.exports = emailService