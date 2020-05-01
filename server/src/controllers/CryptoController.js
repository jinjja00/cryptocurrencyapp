const config  = require('../config/config')

module.exports = {
    async getCrypto (req, res) {
        const rp = require('request-promise')

        const requestOptions = {
            method: 'GET',
            url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
            qs: {
                'start': '1',
                'limit': '10',
                'convert': 'USD'
            },
            headers: {
                'X-CMC_PRO_API_KEY': 'd5470d43-3b82-4d5c-9455-90ffa80334c8'
            },
            json: true,
            gzip: true
        }
        rp(requestOptions).then(response => {
           res.send(response.data)
          }).catch((err) => {
            console.log('API call error:', err.message);
          });
    }
}