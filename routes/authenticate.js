const express = require('express')
const auth = require("../controller/auth")


const useDB = ({ connection }) => {
    const router = express.Router()
    router.get('/', auth.homePage)
    router.post('/', auth.home.bind(null, connection))


    return router
}

module.exports = useDB