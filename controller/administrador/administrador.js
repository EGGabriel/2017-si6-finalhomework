const modelRotas = require('../../model/rotas')
const modelAlunos = require('../../model/alunos/alunos')
const modelVeiculos = require('../../model/veiculo/veiculo')
const modelResponsavel = require('../../model/responsavel')
const modelMotorista = require('../../model/motorista/motorista')
const modelEscola = require('../../model/escolas/escolas')
const { bairros } = require('../../bairros.json')


const cadastrar = (req, res) => {
    res.render('Administrador/cadastrar')
}

const consultar = (req, res) => {
    res.render('Administrador/consultar')
}

const relatorios = (req, res) => {
    res.render('Administrador/relatorios')
}

const rotas = async(connection, req, res) => {
    try {
        const veiculos = await modelVeiculos.getVeiculos(connection)

        res.render('Administrador/cadastrar/rotas', { veiculos })
    } catch (error) {
        res.redirect("/logout")
    }
}

const alunos = async(connection, req, res) => {
    try {
        const responsaveis = await modelResponsavel.findResponsavel(connection)
        const veiculo = await modelVeiculos.getVeiculos(connection)
        const escola = await modelEscola.getEscola(connection)
        res.render('Administrador/cadastrar/alunos', {
            veiculo,
            escola,
            bairros,
            responsaveis
        })
    } catch (err) {
        res.redirect('/logout')
    }
}

const escolas = (req, res) => {
    res.render('Administrador/cadastrar/escolas')
}

const motorista = (req, res) => {
    res.render('Administrador/cadastrar/motorista')

}

const responsaveis = (req, res) => {
    res.render('Administrador/cadastrar/responsaveis')
}

const veiculos = (req, res) => {
    res.render('Administrador/cadastrar/veiculos')
}

module.exports = {
    cadastrar,
    consultar,
    relatorios,
    rotas,
    alunos,
    escolas,
    motorista,
    responsaveis,
    veiculos
}