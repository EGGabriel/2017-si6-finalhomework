const userModel = require("../model/auth")

const home = async(connection, req, res) => {
    let userDB = []

    if (req.body.papel == '') {
        res.redirect('/login')
        return false
    } else if (req.body.papel == 'Administrador') {
        userDB = await userModel.findOneAdm(connection, req)
    } else if (req.body.papel == 'Motorista') {
        userDB = await userModel.findOneMot(connection, req)
    }

    if (userDB.length == 0) {
        res.locals.error = true
        res.render('login')
        return false

    }

    let user = {
        name: userDB[0].nome,
        papel: userDB[0].papel.split(','),
        username: userDB[0].username
    }

    req.session.user = user
    req.session.papel = user.papel[0]
    res.locals.user = user
    res.locals.papel = user.papel[0]

    if (user.papel.includes('Administrador')) {
        res.render('Administrador/homeAdm')
    } else if (user.papel.includes('Motorista')) {
        res.render('Motorista/homeMotorista')
    }
}


const homePage = (req, res) => {
    if ('user' in req.session && req.session.papel == 'Administrador') {
        res.render('Administrador/homeAdm')
    } else if ('user' in req.session && req.session.papel == 'Motorista') {
        res.render('Motorista/homeMotorista')
    } else {
        res.redirect('/')
    }
}

module.exports = {
    home,
    homePage
}