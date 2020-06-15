module.exports = (sequelize, DataTypes) => {
    const Coins = sequelize.define('Coins', {
        cryptoName: DataTypes.STRING,
    })

    Coins.associate = (models) => {
        Coins.belongsToMany(models.Users, {foreignKey: 'CoinID', through: 'CoinsUser'})
    }

    return Coins
}
    