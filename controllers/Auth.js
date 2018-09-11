module.exports = (app, passport, ...rest) => {
    app.route('/login')
        .get( (req, res) => {
            res.render('pages/auth/login')
        })
        .post(passport.authenticate('local-login',{
            successRedirect: '/home',
            failureRedirect: '/login',
            failureFlash: true
        }))

    app.route('/register')
        .get( (req, res) => {
            res.render('pages/auth/register')
        })
        .post(passport.authenticate('local-register', {
            successRedirect: '/',
            failureRedirect: '/register',
            failureFlash: true
        }))
}