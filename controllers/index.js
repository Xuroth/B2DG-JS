//- Base Router
var viewSettings = {
    title: 'B2D | '
}

var user = null;

module.exports = (app, passport, ...rest) => {
    //Sub-Routers

    app.route('/')
        .get( (req, res) => {
            let locals = {
                settings: viewSettings,
            }
            if(req.user){
                locals.user = req.user
            }
            locals.settings.title = 'B2D | Home';
            res.render('pages/base/home', locals);
        })
    
    app.route('/about')
        .get( (req, res) => {
            let locals = {
                settings: viewSettings
            }
            if(req.user){
                locals.user = req.user
            }
            locals.settings.title = 'B2D | About Us';
            res.render('pages/base/about', locals)
        })

    app.route('/contact')
        .get( (req, res) => {
            let locals = {
                settings: viewSettings
            }
            if(req.user){
                locals.user = req.user
            }
            locals.settings.title = 'B2D | Contact Us';
            res.render('pages/base/contact', locals)
        })

    //Routes from Auth Controller
    require('./Auth.js')(app, passport)
}