/**
 * MARCA CONTROLLER
 */
const con = require('../database/conexao');

module.exports = {

    async index(req, res) {

        const marca = await req.body.marca;
        //Query de consulta, para obter os dados da Marca.
        const query = 'SELECT marca,nota_m_geral_marca, qt_avaliacao_geral_marca, qualidade, durabilidade, custo_beneficio, design_tecnologia FROM tbl_dados_geral WHERE marca = ?  GROUP BY marca';

        con.query(query, [marca], (err, result) => {
            //verificando se a consulta esta correta.
            if (err) {// Se tiver erro status 500
                res.status(500).json({ oops: err, mensage: 'Erro do Servidor' })
            }
            else if (result.length > 0) {//Se tiver linha afetada status 200

                return res.status(200).json({ sucess: true, query: result });

            }
            else {//Se não,  status 400

                res.status(404).json({ mensage: 'O servidor não pode encontrar o recurso solicitado.' });
            }

        });

    }

}