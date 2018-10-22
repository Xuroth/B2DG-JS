var mongoose    =   require('mongoose'),
    Schema      =   mongoose.Schema
require('mongoose-double')(mongoose);

var ImageSchema = new Schema({
    name: String,
    filePath: String,
    primary: {
        type: Boolean,
        default: false
    },
    local: {
        type: Boolean,
        default: true
    }
}, {_id: false})

var ProductSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    slug: {
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
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }
    ],
    images: [ImageSchema]
});

ProductSchema.pre('save', function(next) {
    let product = this;
    //Create URL Friendly slug if product is new.
    if(this.isNew) {
        product.slug = product.name.split(' ').join('_').toLowerCase();
    } else if (this.isModified('slug')) {
        //If the slug has been edited, ensure the slug matches the URL-friendly format
        product.slug = product.slug.split(' ').join('_').toLowerCase(); 
    }
    next();
})

module.exports = mongoose.model('Product', ProductSchema);