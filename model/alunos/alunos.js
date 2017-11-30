const getAlunosLike = (connection, req) => {

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM aluno WHERE nome LIKE '%${req.body.key}%'`, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

const getAlunos = (connection) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM aluno', (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

const confereAluno = (connection, req) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM aluno WHERE nome = '${req.body.nome_aluno.toLowerCase()}'`, (err, result) => {

            if (err) {
                reject(err)
            } else if (result.length > 0) {
                reject("Aluno ja existe")
            } else {
                resolve(true)
            }
        })
    })
}

const addAluno = (connection, req) => {

    let vetNnascimento = req.body.nascimento.split('/')
    let nascimento = vetNnascimento[2] + '-' + vetNnascimento[1] + '-' + vetNnascimento[0]

    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO aluno (nome,
                nascimento, rua, numero,
                rua_embarque, bairro_embarque, rua_desembarque, 
                bairro_desembarque, serie, classe, turno, escola, 
                veiculo_ida, veiculo_volta) VALUES ('${req.body.nome_aluno}', '${nascimento}', '${req.body.rua}', 
                '${req.body.numero_casa}', '${req.body.rua_embarque}', '${req.body.bairro_embarque}'
                , '${req.body.rua_desembarque}', '${req.body.bairro_desembarque}', '${req.body.serie}', '${req.body.classe}', '${req.body.turno}', 
                '${req.body.escola}', '${req.body.veiculo_ida}', '${req.body.veiculo_volta}')`

        connection.query(sql, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve({ lastID: result.insertId })
            }
        })
    })
}

module.exports = {
    getAlunos,
    confereAluno,
    addAluno,
    getAlunosLike

}