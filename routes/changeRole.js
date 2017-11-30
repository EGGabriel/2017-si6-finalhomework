const express = require('express')
const router = express.Router()
const changeRoleController = require('../controller/changeRoleController')

router.use((req, res, next) => {
    if ('user' in req.session) {
        next()
    } else {
        res.redirect('/')
        return false
    }
})

router.post('/', changeRoleController.changeRole)

module.exports = router