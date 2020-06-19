const db = require('../models/index')

module.exports = {
    async getUserFavoriteCrypto (req, res) {
        try {
            const coins = await db.Users.findOne({
                where: {
                    id : req.user.id
                },
                attributes:['id'],
                include: [{
                    model: db.Coins,
                    attributes:['cryptoName'],
                    through: {attributes:[]} 
                }]
            })
            .then(response => response.Coins)
            .then(data => {
                res.send({
                    coins: data
                })
            })
        } catch (err) {
            console.log(err)
            res.status(400).send({
                error: err
            })
        } 
    }
}