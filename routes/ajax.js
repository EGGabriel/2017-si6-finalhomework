const express = require('express')
const router = express.Router()

const ajaxController = require('../controller/ajax/ajax')

function useDB({ connection }) {
    router.post('/getAluno', ajaxController.getAluno.bind(null, connection))
    return router
}

module.exports = useDB