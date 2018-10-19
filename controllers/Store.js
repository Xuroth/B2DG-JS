var Products = require('../models/store/Product');
module.exports = (app, passport, ...rest) => {
    app.route('/products')
        .get( (req, res) => {
            Products.find({salable: true}, (err, products) => {
                //Add sorting logic based on database config.store.defaultSortOrder
                //switch/case 'highestSales','newest', etc.

                //Fetch categories and move below code into callback for categories.
                if(err) console.log(err)
                let locals = {
                    products,
                    productsJSON: JSON.stringify(products),
                    user: (req.user?req.user:undefined)
                }
                res.render('pages/store/productList', locals)
                //console.log(products)
            })
        })
        .post( (req, res) => {
            //perform fuzzy matches and return list
            Products.find({salable:true}, (err, products) => {
                if(err) console.log(err)

            })
        })

    app.route('/product/:product')
        .get( (req, res) => {
            let prodName = req.params.product.split('_').join(' ')
            console.log(prodName)
            var ObjectId = require('mongoose').Types.ObjectId;
            if(ObjectId.isValid(prodName)){
                validObjectId = true
            } else {
                validObjectId = false;
            }
            
            if (validObjectId) {
                //Supplied parameter is objectId
                Products.findOne({salable: true, _id: prodName}, (err, product) => {
                    if(err) console.log(err)
                    console.log('Product (by ID): ', product)
                    res.render('pages/store/product', {product, productJSON: JSON.stringify(product)})
                })
            } else {
                console.log(prodName)
                Products.findOne({salable: true, name: prodName.toLowerCase()}, (err, product) => {
                    if(err) console.log(err)
                    console.log('Product: ',product)
                })
            }
            
        })
    //Delete this route after testing!
    app.route('/newProd')
        .get( (req, res) => {
            if(app.get('env') === 'development') {
                let testProd = new Products({
                    name: 'TestProduct With Spaces',
                    description: 'A simple test product that should not be visible except to admins',
                    price: 12.96,
                    salable: false,
                    inStock: 99,
                    maxQtyPerOrder: 0,
                    categories: [],
                    images: [
                        {
                            name: 'TestProdImg',
                            filePath: '/products/testProd.jpg',
                            primary: true
                        }
                    ]
                });
                testProd.save( (err) => {
                    if(err) console.log(err);
                    res.redirect('/products')
                })
            } else {
                res.status(500)
            }
        })
}