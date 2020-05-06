const config  = require('../config/config')
const rp = require('request-promise')

let requestOptions = {
    method: 'GET',
    url: '',
    qs: {},
    headers: {
        'X-CMC_PRO_API_KEY': 'd5470d43-3b82-4d5c-9455-90ffa80334c8'
    },
    json: true,
    gzip: true
}

module.exports = {
    async getCrypto (req, res) {
        requestOptions.url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
        requestOptions.qs =  {
            'start': '1',
            'limit': '10',
            'convert': 'USD'
        }

        rp(requestOptions).then(response => {
           res.send(response.data)
          }).catch((err) => {
            console.log('API call error:', err.message);
          });
    },
    async getCryptoQuoteHistory(req, res) {
        requestOptions.url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical'
        requestOptions.qs =  {
            /* Send the id from the homepage */
            'id': '1',
            'count': '2',
        }

        rp(requestOptions).then(response => {
            res.send(response.data)
           }).catch((err) => {
             console.log('API call error:', err.message);
           });
    }
}