var Products = require('../models/store/Product');
var Categories = require('../models/store/Category')
var Security = require('../libs/Security')
var Cart = require('../libs/Cart')
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
            let prodName = req.params.product.split('_').join(' ').toLowerCase()
            console.log(prodName)
            var ObjectId = require('mongoose').Types.ObjectId;
            if(ObjectId.isValid(prodName)){
                validObjectId = true
            } else {
                validObjectId = false;
            }
            
            if (validObjectId) {
                //Supplied parameter is objectId
                Products.findOne({salable: true, _id: prodName}).populate('categories').exec( (err, product) => {
                    if(err) console.log(err)
                    console.log('Product (by ID): ', product)
                    res.render('pages/store/product', {product, productJSON: JSON.stringify(product)})
                })
            } else {
                console.log(prodName)
                Products.findOne({salable: true, slug: prodName.toLowerCase()}).populate('categories').exec( (err, product) => {
                    if(err) console.log(err)
                    console.log('Product: ',product)
                    res.render('pages/store/product', {product, productJSON: JSON.stringify(product)})
                })
            }
            
        })
    app.route('/cart')
        .get( (req, res) => {
            res.render('pages/store/cart');
        })
        .post( (req, res) => {
            let qty = parseInt(req.body.addQty, 10);
            let productID = req.body.productID;
            if(qty > 0 && Security.isValidNonce(req.body.nonce, req)) {
                Products.findOne({_id: productID}).exec( (err, product) => {
                    if(err) console.log(err);
                    let cart = (req.session.cart?req.session.cart:null);
                    Cart.addToCart(product, qty, cart);
                    res.redirect('/')
                })
            }
        })
    app.route('/cart/update')
        .post( (req, res) => {
            let ids = req.body['productID[]'];
            let qtys = req.body['qty[]'];
            if(Security.isValidNonce(req.body.nonce, req)) {
                let cart = (req.session.cart?req.session.cart: null);
                let i = (!Array.isArray(ids)? [ids]:ids);
                let q = (!Array.isArray(qtys)?[qtys]:qtys);
                Cart.updateCart(i, q, cart);
                res.redirect('/cart')
            } else {
                console.log('Security Mismatch.')
                res.redirect('/cart')
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
    app.route('/newCat')
        .get( (req, res) => {
            if(app.get('env') === 'development') {
                console.log('Creating Test Category')
                let testCat = new Categories({
                  name: 'New Test Category',
                  hidden: false,
                  helpText: 'Some of our test products!',
                  description: 'Some test products will have this category. Be sure to remove all test products and categories routes prior to deployment on production server',
                  addedOn: Date.now(),
                  addedBy: (req.user?req.user._id:"5b97236a9e995d35a8d55e92")

                });
                console.log(testCat)
                testCat.save( (err) => {
                    if(err) console.log(err)
                    console.log('Test Category created!')
                    res.redirect('/products')
                })
            } else {
                res.status(500)
            }
        })

}