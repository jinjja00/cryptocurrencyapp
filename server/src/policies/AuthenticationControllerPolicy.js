const Joi = require('joi')

module.exports = {
    register (req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}')
            )
        }).unknown()
        
        const { error, value} = Joi.validate(req.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'Invalid Email'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: 'Invalid Password , minimum 8 characters'
                    })
                    break
                default:
                    res.status(400).send({
                        error: error.details
                    })
            }
        } else {
            next()
        }
    }
}