/**
 * User Controller
 * express
 */
const mysql = require('mysql');
const con = require('../database/conexao');
const bcrypt = require('bcrypt');

module.exports = {

    async store(req, res) {

        const hash = await bcrypt.hash(req.body.senha, 10);

             
        //Pegando  dados do usuario.
        const usuario = {
            nome: req.body.nome,
            email: req.body.email,
            nascimento: req.body.nascimento,
            telefone: req.body.telefone,
            senha: hash
        }

        //Verificando se tem usuario existente.
        const verificaNome = ' SELECT * FROM tbl_usuario WHERE nome = ?';

        con.query(verificaNome, [usuario.nome], (err,result) => {

            //se o resultado for maior que zero, lança a messagem de erro. 
            if (result.length > 0) {

                return res.status(400).json({ mensage: 'Esse Nome já está sendo usado por outro usuario!', err: err });
            }
            else {
                // Caso não tenho nenhum usuario cadastrado, então ele cadasttra.
                
               

                const query = 'INSERT INTO tbl_usuario SET ?';
                con.query(query, usuario, (err, result) => {

                    if (err) { //verifiicando se a erro.

                        return res.status(500).json({ error: 'Erro no banco de Dados', err: err });
                    }
                    // Retornando a mensagem de sucesso
                    return res.status(200).json({ sucess: true, mensagem: 'Usuario cadastrado comm sucesso!' })

                });

            }

        });
    }
} 