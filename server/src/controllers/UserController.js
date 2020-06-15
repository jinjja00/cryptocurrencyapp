const db = require('../models/index')

module.exports = {
    async getUserFavoriteCrypto (req, res) {
        try {
            const coins = await db.Users.findOne({
                raw:true,
                where: {
                    id : req.query.userId
                },
                attribute:['id'],
                include: [{
                    model: db.Coins,
                    attribute:['cryptoName'],
                }]
            })
            console.log(coins)
            res.send({
                coins: coins
            })
        } catch (err) {
            console.log(err)
            res.status(400).send({
                error: err
            })
        } 
    }
}