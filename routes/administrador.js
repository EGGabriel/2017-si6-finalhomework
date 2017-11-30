const express = require('express')
const router = express.Router()
const administradorController = require('../controller/administrador/administrador')


//function add, edit, delete
const addController = require('../controller/administrador/dataAdministrador')


router.use((req, res, next) => {
    if ('user' in req.session && req.session.user.papel.includes('Administrador')) {
        next()
    } else {
        res.redirect('/')
    }
})

const useDB = ({ connection }) => {
    // funções cadastrar
    router.get('/cadastrar', administradorController.cadastrar)

    router.get('/cadastrar/rotas', administradorController.rotas.bind(null, connection))
    router.post('/cadastrar/rotas', addController.novaRota.bind(null, connection))

    router.get('/cadastrar/alunos', administradorController.alunos.bind(null, connection))
    router.post('/cadastrar/alunos', addController.addAluno.bind(null, connection))

    router.get('/cadastrar/escolas', administradorController.escolas)
    router.post('/cadastrar/escolas', addController.novaEscola.bind(null, connection))

    router.get('/cadastrar/motoristas', administradorController.motorista)
    router.post('/cadastrar/motoristas', addController.novoMotorista.bind(null, connection))

    router.get('/cadastrar/responsaveis', administradorController.responsaveis)
    router.post('/cadastrar/responsaveis', addController.novoResponsavel.bind(null, connection))

    router.get('/cadastrar/veiculos', administradorController.veiculos)
    router.post('/cadastrar/veiculos', addController.novoVeiculo.bind(null, connection))
        // fim cadastrar


    router.get('/consultar', administradorController.consultar)
    router.get('/relatorios', administradorController.relatorios)

    return router
}

module.exports = {
    useDB
}