var mongoose = require('mongoose')
    Schema   = mongoose.Schema
var CommentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    thumbsUp: {
        type: Number,
        default: 0
    },
    thumbsDown: {
        type: Number,
        default: 0
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Number,
        default: 0
    },
    text: {
        type: String
    }
})

module.exports = mongoose.model('Comment', CommentSchema)