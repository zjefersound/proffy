import knex from 'knex';

const db = knex({
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'nlw',
        password : 'nlw',
        database : 'proffy'
    },
    useNullAsDefault: true,
});

export default db;