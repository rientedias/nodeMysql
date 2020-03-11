/**
 * LOGIN CONTROLLER
 */


const con = require('../database/conexao');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const bcrypt = require('bcrypt');

/*
 * Função de Criação JWT.
 */
function geraToken(params = {}) {

    return jwt.sign( params, authConfig.secret, {
        expiresIn: 86400,
    });
}
/**
 * MODULE EXPORTS
 */

module.exports = {

    async store(req, res, next) {

        //Variaveis vinda do usuario(front-end)
        const email = req.body.email;
        const senha = req.body.senha;

        //variavel  de consulta SQL(Buscando Usuario pelo email.)
        const query = "SELECT * FROM tbl_usuario WHERE email = ? ";

        //iniciando a Query
        con.query(query, [email], (err, result) => {

            const id = result[0]['id'];//id
            const pass = result[0]['senha'];//senha
            const mail = result[0]['email'];//email

            if (err) {
                return res.status(500).json({ oops: err, mensage: " Erro do Servidor " });
            }
            if (email == mail) { //Se os email forem iguais

                //Comparando as senhas
                bcrypt.compare(senha, pass, (berr, bres) => {

                    if (berr) {//validaçãos de erro

                        return res.status(500).json({ error: berr });
                    }
                    if (bres) {//se exister resposta, é gerado um Token e enviado  junto com o Id do usuario.
                        token = geraToken({ id: id }, authConfig.secret, {
                            expiresIn: 86400
                        })
                        return res.status(200).json({ sucess: true, id: id, token: token });
                    }
                    else {//senha incorreta

                        return res.status(400).json({ sucess: false, mensage: " As senhas não coincidem!" });
                    }

                });

            }
            else {
                senha = undefined;
                return res.status(400).json({ sucess: false, mensage: "E-mail Invalido!" });
            }

        });

    }

}