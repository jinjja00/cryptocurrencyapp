module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'mydatabase',
        user: process.env.DB_USER || 'engjelladmin',
        password: process.env.DB_PASSWORD || 'adminPassword',
        options: {
            dialect : process.env.DIALECT || 'sqlite',
            host : process.env.HOST || 'localhost',
            storage: './mydatabase.sqlite'
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}
