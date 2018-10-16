//- Base Router
const userHas = require('../middleware/permissions');

var user = null;

module.exports = (app, passport, ...rest) => {
   
    //Sub-Routers
    app.route('/')
        .get( (req, res) => {
            //console.log(req.siteSettings.navigationBar.navLinks)
            let locals = {
                settings: req.siteSettings
            }
            if(req.user){
                locals.user = req.user
            }
            locals.settings.siteTitle += 'Home';
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
    app.route('/testPerm')
        .get( userHas({roles: ['Admin2'], permissions:['lookAtStuff']}), (req, res) => {
            res.redirect('/')
        })
    //Routes from Auth Controller
    require('./Auth.js')(app, passport)
    //Routes from Store Controller
    require('./Store.js')(app, passport)
}