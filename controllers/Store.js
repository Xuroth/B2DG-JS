var Products = require('../models/store/Product');
module.exports = (app, passport, ...rest) => {
    app.route('/products')
        .get( (req, res) => {
            Products.find({salable: true}, (err, products) => {
                //Add sorting logic based on database config.store.defaultSortOrder
                //switch/case 'highestSales','newest', etc.
                if(err) console.log(err)
                let locals = {
                    products,
                    user: (req.user?req.user:undefined)
                }
                res.render('pages/store/productList', locals)
                //console.log(products)
            })
        })
    //Delete this route after testing!
    app.route('/newProd')
        .get( (req, res) => {
            if(app.get('env') === 'development') {
                let testProd = new Products({
                    name: 'TestProduct',
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