var mongoose    =   require('mongoose'),
    Schema      =   mongoose.Schema
require('mongoose-double')(mongoose);

var ImageSchema = new Schema({
    name: String,
    filePath: String,
    primary: {
        type: Boolean,
        default: false
    }
}, {_id: false})

var ProductSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Schema.Types.Double,
        required: true,
        default: 0.00
    },
    salable: {
        type: Boolean,
        default: false
    },
    inStock: {
        type: Number,
        default: 0
    },
    maxQtyPerOrder: {
        type: Number,
        default: 0
    },
    categories: [
        {
            _id: false,
            catID: {
                type: String
            }
        }
    ],
    images: [ImageSchema]
});

module.exports = mongoose.model('Product', ProductSchema);