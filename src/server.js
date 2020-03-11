/**
 * SERVIDOR
 * porta
 * express
 */
const porta = 3333;
const express = require('express');
const mysql = require('mysql');
const routes = require('./routes');

const app = express();



app.use(express.json()); 
app.use(routes);


app.listen(porta, () => {
    console.log('Server em execução!');
});



