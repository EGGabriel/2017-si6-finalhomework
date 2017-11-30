const logout = (req, res) => {
    if ('user' in req.session) {
        req.session.destroy()
        delete res.locals.user
        res.redirect('/')
    }
}

module.exports = {
    logout
}