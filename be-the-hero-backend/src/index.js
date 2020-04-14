const express = require('express');
const cors = require('cors');
const routes = require('./routes')

const app = express();

app.use(cors());
app.use(express.json());   
app.use(routes)

/**
 * Tipos de Parâmetros:
 * 
 * Query Params: Parâmetros  nomeado enviados na roda após "?" (filtros, paginação) (request.query)
 * Route Params: Parâmetros utilizados para identificar recursos (request.params)
 * Request Body: Corpo da requisição utilizado para criar ou alterar recursos
 */

 /**
  * Driver: SELECT * FROM users
  * Query Builder: table('users').select('*').where()
  */


app.listen(3333);