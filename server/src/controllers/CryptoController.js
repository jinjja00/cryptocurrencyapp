const config  = require('../config/config')
const rp = require('request-promise')
const CoinGecko = require('coingecko-api')

const CoinGeckoClient = new CoinGecko()

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
      console.log(req.query.coinId)
      console.log(req.query)
      await CoinGeckoClient.coins.fetchMarketChart(req.query.coinId,{
        vs_currency: req.query.vs_currency,
        days: req.query.days
      })
      .then(response => {
        res.send(response.data)
      })
      .catch(error => {
        console.log(error)
      }) 
    }
}