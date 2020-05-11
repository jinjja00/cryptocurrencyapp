const config  = require('../config/config')
const rp = require('request-promise')
const CoinGecko = require('coingecko-api')

const CoinGeckoClient = new CoinGecko()

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
          await CoinGeckoClient.coins.markets(
            { vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
              sparkline: true,
              price_change_percentage: "24h"})
            .then(response => {
              res.send(response.data)
            })
            .catch(error => {
              console.log(error)
            })
    },
    async getCryptoQuoteHistory(req, res) {
        /* const request = {
            ...requestOptions,
            url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical',
            qs: { 
                'id': '1'
            }
          } */
     
    
    }
}