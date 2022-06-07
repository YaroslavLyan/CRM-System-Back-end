const keys = require('./config');

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : keys.host,
      port : keys.port,
      user : keys.user,
      password : keys.password,
      database : keys.database
    }
  });

module.exports = knex;