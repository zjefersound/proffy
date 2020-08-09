import path from 'path';

module.exports = {
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'nlw',
        password : 'nlw',
        database : 'proffy'
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
};