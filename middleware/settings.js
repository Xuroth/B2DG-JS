var Settings = require('../models/site/setting')

var settingsDB = function(req, res, next) {

        Settings.findOne({'type': 'site'}, (err, settings) => {
            // req.siteSettings = settings;
            res.locals.siteSettings = settings
            res.locals.siteSettingsJSON = JSON.stringify(settings)
            //console.log('middleware',req.siteSettings)
            next()
        })

};

module.exports = settingsDB