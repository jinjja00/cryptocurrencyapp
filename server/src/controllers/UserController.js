const {CoinsUserRelations} = require('../models')

module.exports = {
    async getUserFavoriteCrypto (req, res) {
        try {
            const coins = await CoinsUserRelations.findAll({
                raw: true,
                nest: true,
                where: {
                    UserID : req.query.userId
                }
            })
            console.log(coins.CoinID)
            res.send({
                coins: coins
            })
        } catch (err) {
            res.status(400).send({
                error: 'Issue with request'
            })
        }
    }
}