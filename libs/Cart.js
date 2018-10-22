'use strict';

const cartConfig = {
    locale: {
        lang: process.env.LOCALE_LANG,
        currency: process.env.LOCALE_CURRENCY
    }
}

class Cart {
    constructor() {
        this.data = {
            items: [],
            totals: 0,
            formattedTotals: ''
        };
    }
    static inCart (productID = 0, cart) {
        let found = false;
        cart.items.forEach( item => {
            if(item._id === productID){
                found = true
            }
        })
        return found;
    }
    static calculateTotals(cart){
        cart.totals = 0.00;
        cart.items.forEach( item => {
            let price = item.price;
            let qty = item.qty;
            let amount = price * qty;

            cart.totals += amount
        });
        this.setFormattedTotals(cart);
    }
    static setFormattedTotals(cart){
        let format = new Intl.NumberFormat(cartConfig.locale.lang, {style: 'currency', currency: cartConfig.locale.currency});
        let totals = cart.totals;
        cart.formattedTotals = format.format(totals);
    }
    static addToCart (product = null, qty = 1, cart) {
        if(!this.inCart(product._id, cart)){
            let format = new Intl.NumberFormat(cartConfig.locale.lang, {style: 'currency', currency: cartConfig.locale.currency});
            let prod = {
                _id: product._id,
                name: product.name,
                price: product.price,
                qty: qty,
                image: product.images.filter( image => {
                    return image.primary === true
                })[0],
                slug: product.slug,
                formattedPrice: format.format(product.price)
            };
            cart.items.push(prod);
            this.calculateTotals(cart);
        }
    }
    static saveCart(req) {
        if(req.session){
            req.session.cart = this.data;
        }
    }
    static removeFromCart(productID = 0, cart){
        for(let i  = 0; i < cart.items.length; i++) {
            let item = cart.items[i];
            if(item._id === productID) {
                cart.items.splice(i, 1);
                this.calculateTotals(cart);
            }
        }
    }
    static emptyCart(req) {
        cart = {
            items: [],
            totals: 0,
            formattedTotals: ''
        }
        if(req.session){
            req.session.cart = cart;
        }
    }
    static updateCart(productIDs = [], qtys = [], cart) {
        let map = [];
        let updated = false;

        productIDs.forEach( id => {
            qtys.forEach( qty => {
                map.push({
                    id: id,
                    qty: parseInt(qty, 10)
                });
            });
        });
        map.forEach( obj => {
            cart.items.forEach( item => {
                if(item._id = obj.id){
                    if(obj.qty > 0 && obj.qty !== item.qty) {
                        item.qty = obj.qty;
                        updated = true;
                    }
                }
            });
        });
        if(updated){
            this.calculateTotals(cart);
        }
    }
}

module.exports = Cart;