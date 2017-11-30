const addEscola = (connection, req) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO escola (nome, rua, numero, bairro, telefone, 
        contato, hora_inicio, hora_final) VALUES 
        ('${req.body.nome}','${req.body.rua}','${req.body.numero}','${req.body.bairro}','${req.body.telefone}',
        '${req.body.contato}','${req.body.horario_inicio}','${req.body.horario_final}')`, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })

}

const getEscola = (connection) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM escola", (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

module.exports = {
    addEscola,
    getEscola
}