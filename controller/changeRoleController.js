const changeRole = (req, res) => {
    req.session.papel = req.body.role
    res.locals.papel = req.session.papel
    if (req.session.papel == 'Administrador') {
        res.render('Administrador/homeAdm')
    } else {
        res.render('Motorista/homeMotorista')
    }

}

module.exports = {
    changeRole
}