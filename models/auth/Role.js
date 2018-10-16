var mongoose = require('mongoose')

var roleSchema = mongoose.Schema({
    name: {
        type: String
    },
    permissions: {
        type: Array
    },
    inherits: {
        type: String
    }
})

module.exports = mongoose.model('Role', roleSchema)