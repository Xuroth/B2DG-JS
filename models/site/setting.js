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
    },
    cartDisplayType: {
        type: String
        //Should match either 'count' or 'price'. 'count' shows the number of items in the cart, while 'price' totals the price for all items and displays that instead.
    },
    cartIcon: {
        type: String
        //Should be the class for the icon ex 'fal fa-shopping-cart' to use FA cart icon
    }
})

module.exports = mongoose.model('Setting', SettingsSchema);