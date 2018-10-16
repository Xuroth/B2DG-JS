var Settings = require('../models/site/setting')

var settingsDB = function(req, res, next) {

        Settings.findOne({'type': 'site'}, (err, settings) => {
            req.siteSettings = settings;
            //console.log('middleware',req.siteSettings)
            next()
        })

};

module.exports = settingsDB