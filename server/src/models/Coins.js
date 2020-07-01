const fetch = require('node-fetch');

function getCoinsList () {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  
    return fetch(url)
    .then((response) => response.json())
    .then(c => c.map(i => i.id))
}

module.exports = (sequelize, DataTypes) => {
    const Coins = sequelize.define('Coins', {
        cryptoName: DataTypes.STRING,
    })

    Coins.associate = (models) => {
        Coins.belongsToMany(models.Users, {foreignKey: 'CoinID', through: 'CoinsUser'})
    }

    Coins.sync().then(() => {
        getCoinsList().then( t => {
            t.forEach(n => {
                Coins.create({
                    cryptoName: n
                })
            })
        })
    })

    return Coins
}
    