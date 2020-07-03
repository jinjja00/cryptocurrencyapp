const AuthenticationController =  require('./controllers/AuthenticationController')
const CryptoController = require('./controllers/CryptoController')
const UserController = require('./controllers/UserController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const AuthCurrentUser = require('./middleware/auth')

module.exports = (app) => {
    app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register),
    app.post('/login', AuthenticationController.login),
    app.get('/getcrypto', CryptoController.getCrypto)
    app.get('/getcryptoquote', CryptoController.getCryptoQuoteHistory)
    app.get('/getcryptoeventincoming', CryptoController.getCryptoEventsIncoming)
    app.get('/getcoininformation', CryptoController.getCoinInformation)
    app.get('/getuserfavoritescoins', AuthCurrentUser.getCurrentUserId, UserController.getUserFavoriteCrypto)
    app.post('/adduserfavoritecrypto', AuthCurrentUser.getUserWithHisFavoriteCrypto, UserController.addUserFavoriteCrypto)
    app.post('/removeuserfavoritecrypto', AuthCurrentUser.getUserWithHisFavoriteCrypto, UserController.removeUserFavoriteCrypto)
}