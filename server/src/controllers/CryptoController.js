const CoinGecko = require('coingecko-api')
const fetch = require('node-fetch');
const CoinGeckoClient = new CoinGecko()

module.exports = {
    async getCrypto (req, res) {
      await CoinGeckoClient.coins.markets(
        { vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 30,
          page: 1,
          sparkline: true,
          price_change_percentage: "1h,24h,7d"})
        .then(response => {
          res.send(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    async getCoinInformation (req, res) {
      await CoinGeckoClient.coins.fetch(req.query.coinId, {})
      .then(response => {
        res.send(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    async getCryptoQuoteHistory(req, res) {
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
    },
    async getCryptoEventsIncoming(req, res) {
      await CoinGeckoClient.events.all()
      .then(response => {
        res.send(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    async getCryptoTrending(req, res) {
        try {
          const response = await fetch("https://api.coingecko.com/api/v3/search/trending", {
	          method: 'get',
           })
           .then(response => response.json())
           .then(data => res.send(data))
        } catch (error) {
          console.log(error)
        }
    }
}