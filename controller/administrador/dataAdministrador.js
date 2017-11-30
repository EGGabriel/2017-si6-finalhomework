const modelRotas = require('../../model/rotas')
const modelResponsavel = require('../../model/responsavel')
const modelEscola = require("../../model/escolas/escolas")
const modelVeiculo = require("../../model/veiculo/veiculo")
const modelMotorista = require("../../model/motorista/motorista")
const modelAluno = require('../../model/alunos/alunos')

const novaRota = async(connection, req, res) => {
    try {
        const result = await modelRotas.addRota(connection, req)
        res.redirect('/adm/cadastrar')
    } catch (error) {
        res.redirect('/')
    }

}

const novaEscola = async(connection, req, res) => {
    try {
        await modelEscola.addEscola(connection, req)
        res.redirect('/adm/cadastrar?true') //confirmação de cadastro efetuado com sucesso

    } catch (error) {
        res.redirect('/')
    }
}

const novoResponsavel = async(connection, req, res) => {
    try {
        const result = await modelResponsavel.addResponsavel(connection, req)
        await modelResponsavel.linkResponsavelAluno(connection, req, result)
        res.redirect('/adm/cadastrar?true')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

const novoVeiculo = async(connection, req, res) => {
    try {
        await modelVeiculo.addVeiculo(connection, req)
        res.redirect('/adm/cadastrar?true')
    } catch (error) {
        res.redirect('/')
    }
}

const novoMotorista = async(connection, req, res) => {
    try {
        await modelMotorista.addMotorista(connection, req)
        res.redirect('/adm/cadastrar?true')
    } catch (error) {
        res.redirect('/logout')
    }
}

const addAluno = async(connection, req, res) => {
    try {
        await modelAluno.confereAluno(connection, req)
        let ultimoId = await modelAluno.addAluno(connection, req)
        await modelResponsavel.ligarResp_Aluno(connection, req, ultimoId)
        await modelVeiculo.ligarAlunoVeiculo(connection, req, ultimoId)
        res.redirect('/adm/cadastrar?true')
    } catch (error) {
        console.log(error)
        res.redirect('/logout')
    }
}

module.exports = {
    novaRota,
    novaEscola,
    novoVeiculo,
    novoMotorista,
    addAluno,
    novoResponsavel
}