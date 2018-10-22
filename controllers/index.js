//- Base Router
const userHas = require('../middleware/permissions');
var Articles = require('../models/site/Article')

var user = null;

module.exports = (app, passport, ...rest) => {
   
    //Sub-Routers
    app.route('/')
        .get( (req, res) => {
            Articles.find({frontPage: true}).populate('createdBy').exec( (err, articles) => {
                if(err) console.log(err);
                console.log(articles)
                res.render('pages/base/home', {articles});
            })
            
        })
    
    app.route('/about')
        .get( (req, res) => {
            
            res.render('pages/base/about')
        })

    app.route('/contact')
        .get( (req, res) => {
            
            res.render('pages/base/contact')
        })
    app.route('/testPerm')
        .get( userHas({roles: ['Admin2'], permissions:['lookAtStuff']}), (req, res) => {
            res.redirect('/')
        })
    //Routes from Auth Controller
    require('./Auth.js')(app, passport)
    //Routes from Store Controller
    require('./Store.js')(app, passport)
    //Routes from Admin Controller
    //require('./Admin.js')(app, passport)
    
}