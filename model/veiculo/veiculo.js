const addVeiculo = (connection, req) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO veiculo (placa, frota, modelo, ano, capacidade, renavam, 
            chassi, vencimentoInspecao) VALUES 
            ('${req.body.placa}', '${req.body.frota}', '${req.body.modelo}', '${req.body.ano}', 
            '${req.body.capacidade}', '${req.body.renavam}', '${req.body.chassi}', '${req.body.vencimento_inspecao}')`

        connection.query(sql, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })

    })
}

const getVeiculos = (connection) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM veiculo`
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

const ligarAlunoVeiculo = (connection, req, ultimoID) => {
   return new Promise((resolve, reject) => {
    let sqlFind = `SELECT * FROM veiculo WHERE placa = '${req.body.veiculo_ida}'`
    connection.query(sqlFind, (err, result) => {
        if(err) {
            reject(err)
        } else  {
            connection.query(`SELECT * FROM veiculo WHERE placa = '${req.body.veiculo_volta}'`, (e, r) => {
                if(result.length == 0 && r.length > 0) {
                        connection.query(`INSERT INTO onibus_alunos (id_aluno, placa_veiculoVolta)
                         VALUES ('${ultimoID.lastID}', '${req.body.veiculo_volta}')`, (error, rs) => {
                            if(err) {
                                reject(err)
                            } else {
                                resolve(true)
                            }
                         })
                } else if(result.length > 0 && r.length > 0) {

                      connection.query(`INSERT INTO onibus_alunos (id_aluno, placa_veiculo, placa_veiculoVolta)
                         VALUES ('${ultimoID.lastID}', '${req.body.veiculo_ida}','${req.body.veiculo_volta}')`, (error, rs) => {
                            if(err) {
                                reject(err)
                            } else {
                                resolve(true)
                            }
                         })
                } else if(result.length > 0 && r.length == 0) {

                    connection.query(`INSERT INTO onibus_alunos (id_aluno, placa_veiculo)
                         VALUES ('${ultimoID.lastID}', '${req.body.veiculo_ida}')`, (error, rs) => {
                            if(err) {
                                reject(err)
                            } else {
                                resolve(true)
                            }
                         })
                } else {
                    resolve(true)
                }
            })
        }
    })
   })
}

module.exports = {
    addVeiculo,
    getVeiculos,
    ligarAlunoVeiculo
}