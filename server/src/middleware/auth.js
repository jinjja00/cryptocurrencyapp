const jwt = require('jsonwebtoken')

module.exports = {
    getCurrentUserId (req, res, next) {
        const token = req.query.token

        if (token) {
            jwt.verify(token, 'secret', function (err, decoded) {
                if (err) {
                  res.status(401).send('Invalid token')
                }
                req.user = decoded
                next();
            })
        }
        else {
            return res.json({
              success: false,
              message: 'Auth token is not supplied'
            })
        }   
    },
    getUserWithHisFavoriteCrypto (req, res, next) {
        const coinID = req.body.params.coinId
        const token = req.body.params.token
        
        if (coinID) {
            jwt.verify(token, 'secret', function (err, decoded) {
                if (err) {
                  res.status(401).send('Invalid token')
                }
                req.userCrypto = {
                    user: decoded,
                    coin : coinID
                }
                next();
              })
        } 
        else {
            return res.json({
              success: false,
              message: 'Issue with adding your favorite coins'
            })
        } 
    }
}