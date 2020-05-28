module.exports = (sequelize, DataTypes) => {
    const Coin = sequelize.define('Coin', {
        cryptoName: DataTypes.STRING,
    })
    return Coin
}
    