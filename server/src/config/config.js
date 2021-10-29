module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || '#',
        user: process.env.DB_USER || '#',
        password: process.env.DB_PASSWORD || '#',
        options: {
            dialect : process.env.DIALECT || 'sqlite',
            host : process.env.HOST || 'localhost',
            storage: '#'
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}
