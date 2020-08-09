import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();

        table.timestamp('created_at')
            .defaultTo(knex.fn.now())
            .notNullable(); 
        table.integer('user_id').unsigned();
        table.foreign('user_id')
            .references('users.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        
    });
}
export async function down(knex: Knex) {
    return knex.schema.dropTable('connections');
}