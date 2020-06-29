module.exports = (sequelize, DataTypes) => {
    const CoinsUser = sequelize.define('CoinsUser', {
        UserID: {
            type: DataTypes.INTEGER,
        },
        CoinID: {
            type: DataTypes.INTEGER,
        }
    })

    return CoinsUser
  }