module.exports = (sequelize, DataTypes) => {
    const CoinsUserRelations = sequelize.define('CoinsUserRelations', {
        UserID: {
            type: DataTypes.INTEGER,
        },
        CoinID: {
            type: DataTypes.INTEGER,
        }
    })

    return CoinsUserRelations
  }