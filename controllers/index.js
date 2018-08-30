//- Base Router
var viewSettings = {
    title: 'B2D | '
}

module.exports = (app, ...rest) => {
    //Sub-Routers

    app.route('/')
        .get( (req, res) => {
            let locals = {
                settings: viewSettings
            }
            locals.settings.title = 'B2D | Home';
            res.render('pages/base/home', locals);
        })
}