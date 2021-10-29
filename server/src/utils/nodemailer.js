const nodemailer = require("nodemailer")
const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')

async function sendEmailToVerifyAccount(userId, userEmail, userCode) {
  const baseUrl = 'http://localhost:8081'
  const filePath = path.join(__dirname, '../utils/emailTemplate.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {
    baseUrl,
    userId,
    userCode
  }

  const htmlToSend = template(replacements);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: '#',
      pass: '#'
    }
  })

  const mailOptions = {
    from: `#`,
    to: userEmail,
    subject: "Activated your cryptobis account",
    html: htmlToSend,
    attachments: [{
      filename: 'main.png',
      path: __dirname +'/picturesEmailTemplate/main.png',
      cid: 'logo' 
 }]
}
  await transporter.sendMail(mailOptions);
}
module.exports = sendEmailToVerifyAccount
