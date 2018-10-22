var mongoose    =   require('mongoose');

var EditSchema = mongoose.Schema({
    editedBy: {
        type: String,
        required: false
    },
    editedOn: {
        type: Date,
        required: false,
        default: Date.now()
    }
}, {_id: false})

var ArticleSchema = mongoose.Schema({
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    frontPage: {
        type: Boolean,
        default: false
    },
    mainImg: {
        filePath: {
            type: String
        },
        name: {
            type: String
        }
    },
    content: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    edits: [EditSchema]
});

module.exports = mongoose.model('Article', ArticleSchema);