const md5 = require('md5')
const addMotorista = (connection, req) => {
    let senha = md5(req.body.senha)
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO motorista (nome, nascimento, endereco, telefone, 
        cnh, vencimento, username, cpf, matricula, senha) VALUES 
        ('${req.body.nome}','${req.body.nascimento}','${req.body.endereco}',
        '${req.body.telefone}','${req.body.cnh}','${req.body.vencimento}','${req.body.username}',
        '${req.body.cpf}','${req.body.matricula}','${senha}')`, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

const findMotorista = (connection) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM motorista`
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

module.exports = {
    addMotorista,
    findMotorista
}