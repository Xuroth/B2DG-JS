//A simple psuedo-random Security class for validating sessions and form submission
// Based on the work of Gabriel Romanato (https://github.com/gabrielromanato/Node.js-Shopping-Cart/)
'use strict';
const crypto = require('crypto');
class Security {
    static md5(value) {
        if(!value){
            return;
        }
        return crypto.createHash('md5').update(value).digest('hex');
    }
    static isValidNonce(value, req) {
        return (value === this.md5(req.sessionID + req.headers['user-agent']));
    }
    static generateID() {
        let timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        let template = '%'.repeat(16);
        return timestamp + template.replace(/[%]/g, () => {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }
}
module.exports = Security;