module.exports = (sequelize, DataTypes) => {
    const Codes = sequelize.define('Codes', {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        code: DataTypes.STRING,
        dateCreated :{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW 
        }
     
    })

    return Codes
}
    
