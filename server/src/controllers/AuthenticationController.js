const {Users} = require('../models')
const jwt = require('jsonwebtoken')
const config  = require('../config/config')
const emailService = require("../utils/nodemailer")
const crypto = require("crypto");


function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

async function sendEmailToVerifyAccount (userId, userEmail, userCode) {
    const baseUrl = 'http://localhost:8081'

    const data = {
        from: `enbis95@gmail.com`,
        to: userEmail,
        subject: "Activated your cryptobis account",
        html: `<p>Please use the following link within the next 10 minutes to activate your account on YOUR APP: 
        <a href="${baseUrl}/verifyUserEmail/${userId}/${userCode}">Verify</a>`
    }

    await emailService.sendMail(data)
}

module.exports = {
    async register (req, res) {
        try {
            const verificationCode = crypto.randomBytes(16).toString("hex")

            await Users.create({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                code: verificationCode
            }).then( result => {
                 sendEmailToVerifyAccount(result.id, result.email, verificationCode)
                if (sendEmailToVerifyAccount){
                    res.status(200).send({
                        success: 'account created'
                    })
                }
            })
        } catch (err) {
            res.status(400).send({
                err
            })
        }
    },
    async login (req, res) {
        try {
            const {email, password} = req.body
            const user = await Users.findOne({
                where: {
                    email: email
                }
            })

            if (!user) {
                return res.status(403).send({
                    error: 'The login information was incorrect'
                })
            }
            const isPasswordValid = await user.comparePassword(password)

            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'The login information was incorrect'
                })
            }

            const userCo = {
                id: user.id,
                email: user.email
            }

            res.send({
                user: userCo,
                token: jwtSignUser(userCo)
            })
        } catch (err) {
            console.log(err)
            res.status(403).send({
                error: 'An error has occured trying to log in'
            })
        }
    },
    async verifyUserWithEmail (req, res) { 
        console.log(req.params)
        const user = await Users.findOne({
            where: {
                code: req.params.secretCode
            },
            attributes:['id','code','status']
        }).then( result => {
            Users.update({ status: 'activated', code:'' }, {
                where: {
                  code: result.code
                }
            })
       })

    }
}