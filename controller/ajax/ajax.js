const modelAluno = require('../../model/alunos/alunos')

const getAluno = async(connection, req, res) => {

    try {
        let results = await modelAluno.getAlunosLike(connection, req)
        res.send(results)
    } catch (e) {
        res.send('')
    }
}

module.exports = {
    getAluno
}