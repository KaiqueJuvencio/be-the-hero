const knex = require('knex');
const configuration = require('../../knexfile');
/**
 * Conecta com o banco de dados
 */
const connection = knex(configuration.development); //Escolhe a conexao development do knexfile.js

module.exports = connection;