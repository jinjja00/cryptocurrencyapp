const db = require('../models/index')

module.exports = {
    async getUserFavoriteCrypto (req, res) {
        try {
            console.log(req.user.id)
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
    },
    async addUserFavoriteCrypto(req, res) {
        try {
            const favoriteCoin = await db.Coins.findOne({
                where: {
                    cryptoName: req.userCrypto.coin
                },
                attributes:['id']
            }).then(c => 
                db.CoinsUser.create({ CoinID: c.id, UserID: req.userCrypto.user.id })
            )
        }
        catch(err) {
            console.log(err)
        }
    },
    async removeUserFavoriteCrypto(req, res) {
        try {
            const favoriteCoin = await db.Coins.findOne({
                where: {
                    cryptoName: req.userCrypto.coin
                },
                attributes:['id']
            }).then(c => 
                db.CoinsUser.destroy({ 
                    where: {
                        CoinID : c.id,
                        UserID : req.userCrypto.user.id 
                    }
                })
            )
        }
        catch(err) {
            console.log(err)
        }
    }
}