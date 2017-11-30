const md5 = require('md5')

const addRotas = (connection, req) => {
    return new Promise(async(resolve, reject) => {
        const data = req.body
        let sql = `INSERT INTO rotas (nome, celular, parentesco, rua, numero, bairro)
         VALUES ('${data.nome}','${data.celular}','${data.parentesco}','${data.rua}','${data.numero}','${data.bairro}')`

        connection.query(sql, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })

    })
}

const findRotas = async(connection, req, res) => {
    return new Promise(async(resolve, reject) => {
        await connection.query(`SELECT * FROM rotas`, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

module.exports = {
    addRotas,
    findRotas
}