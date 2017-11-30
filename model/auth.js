const md5 = require('md5')
const findOneAdm = (connection, req) => {

    const senha = md5(req.body.password)
    return new Promise(async(resolve, reject) => {

        await connection.query(`SELECT * FROM administrador WHERE username = '${req.body.usuario}' AND senha = '${senha}'`, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

const findOneMot = (connection, req) => {
    const senha = md5(req.body.password)
    return new Promise(async(resolve, reject) => {
        await connection.query(`SELECT * FROM motorista WHERE username = '${req.body.usuario}' AND senha = '${senha}'`, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

module.exports = {
    findOneAdm,
    findOneMot
}