/**
 * ROUTES
 * express
 */

const express = require('express');
const mysql =  require('mysql');

//Importação de Controller.
const UserController = require('./controllers/UserController');
const MarcaControlller  = require('./controllers/MarcaController');
const LoginController  = require('./controllers/LoginController');
const con = require('./database/conexao')
const routes = express.Router();


/*
 * METODO POST
 * /registro
 * /marca
 * /login
 */

routes.post('/registro',UserController.store); 

routes.post('/marca', MarcaControlller.index);

routes.post('/login', LoginController.store);
/*
 * METODO GET
 * /usuario
 */








module.exports = routes;//Exportando as rotas