 const User = require('./User.js')
 const Coin = require('./Coin.js')

module.exports = (sequelize, DataTypes) => {
    const CoinUsersRelations = sequelize.define('CoinUsersRelations', {
        UserID: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: "UserID"
            }
        },
        CoinID: {
            type: DataTypes.INTEGER,
            references: {
                model: Coin,
                key: "CoinID"
            }
        }
    })

    CoinUsersRelations.belongsToMany(Coin, { foreignKey: 'CoinID' })
    CoinUsersRelations.belongsTo(User, { foreignKey: 'UserID' })

    return CoinUsersRelations
}
    