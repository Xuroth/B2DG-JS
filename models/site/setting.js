var mongoose = require('mongoose');

var NavigationBarSchema = mongoose.Schema({
    text: {
        type: String
    },
    icon: {
        type: String
    },
    route: {
        type: String
    },
    loginRequired: {
        type: Boolean
    },
    adminRequired: {
        type: Boolean
    },
    hidden: {
        type: Boolean
    }
})

var SettingsSchema = mongoose.Schema({
    type: {
        type: String
    },
    siteName: {
        type: String
    },
    siteTitle: {
        type: String
    },
    navigationBar: {
        icons: {
            type: Boolean
        },
        iconSize: {
            type: String
        },
        navLinks: [NavigationBarSchema]
    }
})

module.exports = mongoose.model('Setting', SettingsSchema);