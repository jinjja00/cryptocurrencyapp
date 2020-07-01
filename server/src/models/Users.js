const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
    const salt = 8

    if (!user.changed('password')) {
        return;
    }

    return bcrypt
        .genSaltAsync(salt)
        .then(s => bcrypt.hashAsync(user.password, s, null))
        .then(hash => {
            user.setDataValue('password', hash)
        })
}

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING
    }, {
        hooks: {
            beforeSave: hashPassword
        }
    })
    Users.associate = (models) => {
        Users.belongsToMany(models.Coins, {foreignKey: 'UserID', through: 'CoinsUser'})
    }
    Users.sync().then(() => {
        Users.create({
            firstName: "Engjell",
            lastName: "Bislimi",
            email: "engjellbislimi1@gmail.com",
            password: "Bonjour00"
        })
    })

    Users.prototype.comparePassword = function (userPassword) {
        return bcrypt.compareAsync(userPassword, this.password)
    }

    return Users
}
    
