module.exports = (sequelize, DataTypes) => {
    const Coin = sequelize.define('Coin', {
        cryptoName: DataTypes.STRING,
    })

    Coin.associate = function(models) {
        Coin.belongsToMany(models.User, {foreignKey: 'CoinID', through: 'CoinsUserRelations'})
    }

    return Coin
}
    