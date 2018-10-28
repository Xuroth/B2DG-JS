var mongoose    =   require('mongoose'),
    Schema      =   mongoose.Schema;

var CategorySchema = new Schema({
    name: {
        //Category Name
        type: String,
        required: true
    },
    hidden: {
        //Hide category from listing and searches?
        //This is intended for basic 'related products' linking
        type: Boolean
    },
    helpText: {
        //This is text that the customerUser will be able to view.
        type: String,
        default: ''
    },
    description: {
        //This is description for adminUsers.
        type: String,
        default: ''
    },
    addedOn: {
        //Timestamp added
        type: Date
    },
    addedBy: {
        //UserID that created this resource
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    modifiedOn: {
        //Last edit timestamp
        type: Date,
        default: Date.now
    },
    modifiedBy: {
        //UserID of last edit
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
});

// CategorySchema.pre('save', function(next) {
//     let category = this;
//     //Ensure the helpText and description fields are present in document,
//     //even if they are just empty strings. SHOULD be handled by 'default'
//     //in schema entries.

//     //Other processing (none needed yet)
// })

module.exports = mongoose.model('Category', CategorySchema);