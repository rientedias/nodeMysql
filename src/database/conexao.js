const mysql = require('mysql');

const con = mysql.createConnection({

    host: 'localhost',
    user: 'eder',
    password: 'eder*1234',
    database: 'feedback'

});

con.connect((err) => {
    //verificando se a erro. 
    if (err){
        console.log('erro na conecxão', err)
        return
    }
    console.log('Conectado!');

});

module.exports = con