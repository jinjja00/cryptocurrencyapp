const AuthenticationController =  require('./controllers/AuthenticationController')
const CryptoController = require('./controllers/CryptoController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
    app.post('/register',AuthenticationControllerPolicy.register, AuthenticationController.register),
    app.post('/login', AuthenticationController.login),
    app.get('/getcrypto', CryptoController.getCrypto)
    app.get('/getcryptoquote', CryptoController.getCryptoQuoteHistory)
    app.get('/getcryptoeventincoming', CryptoController.getCryptoEventsIncoming)
}
