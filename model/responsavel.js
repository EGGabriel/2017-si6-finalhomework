const md5 = require('md5')

const addResponsavel = (connection, req) => {
    return new Promise(async(resolve, reject) => {
        const data = req.body
        let sql = `INSERT INTO responsaveis (nome, celular01, celular02, cpf, bairro, rua, numero)
         VALUES ('${data.nome}','${data.celular01}','${data.celular02}','${data.cpf}','${data.bairro}','${data.rua}','${data.numero}')`

        connection.query(sql, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve({ lastID: result.insertId })
            }
        })

    })
}

const findResponsavel = async(connection, req, res) => {
    return new Promise(async(resolve, reject) => {
        await connection.query(`SELECT * FROM responsaveis`, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

const ligarResp_Aluno = (connection, req, ultimoID) => {
    return new Promise((resolve, reject) => {
        if (req.body.idResponsavel != null) {
            connection.query(`INSERT INTO responsaveis_aluno (id_aluno, id_responsavel) VALUE ('${ultimoID.lastID}', '${req.body.idResponsavel}')`, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }
            })
        } else {
            if ('nome' in req.body) {

                let resultados = Array()

                for (let i in req.body.nome) {
                    connection.query(`INSERT INTO responsaveis (nome, celular01, celular02, cpf, bairro, rua, numero) VALUES
                    ('${req.body.nome[i]}', '${req.body.celular01[i]}', '${req.body.celular02[i]}',
                     '${req.body.cpf[i]}', '${req.body.bairro[i]}', '${req.body.rua[i]}', '${req.body.numero[i]}')`, async(err, result) => {
                        if (err) {
                            reject(err)
                        } else {
                            try {
                                resultados.push(await responsaveis_aluno(result.insertId, ultimoID, connection, req.body.parentesco[i]))
                                if (i == req.body.nome.length - 1) {
                                    resolve(resultados)
                                }
                            } catch (err) {
                                reject(err)
                            }

                        }
                    })
                }
            }
        }
    })
}

function responsaveis_aluno(ultimoidRes, ultimoID, connection, parentesco) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO responsaveis_aluno (id_aluno, id_responsavel, parentesco) VALUES 
                            ('${ultimoID.lastID}', '${ultimoidRes}', '${parentesco}')`, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

const linkResponsavelAluno = (connection, req, ultimoID) => {
    let vetResult = Array()
    return new Promise(async(resolve, reject) => {
        for (let i in req.body.nome_aluno) {
            try {
                vetResult.push(await responsaveis_aluno(connection, req.body.nome_aluno[i], ultimoID, req.body.parentesco))

                if (vetResult.length - 1 == req.body.nome_aluno.length - 1) {
                    resolve(vetResult)
                }

            } catch (error) {
                reject(error)
            }
        }

    })
}

function responsavel_aluno(connection, idAluno, ultimoID, parentesco) {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO responsaveis_aluno (id_aluno, id_responsavel, parentesco)
         VALUES ('${idAluno}', '${ultimoID}', '${parentesco}')`
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
    addResponsavel,
    findResponsavel,
    ligarResp_Aluno,
    linkResponsavelAluno
}