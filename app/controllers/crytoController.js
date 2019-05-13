const key = process.env._KEY;
const cryto = require('crypto');
const alg = 'aes-256-ctr';

module.exports.crypt = function(pass){
    const cipher = crypto.createCipher(alg, key);
    const crypted = cipher.update(pass, 'utf8', 'hex');
    return crypted;
}

module.exports.decrypt = function(pass_crypted){
    const decipher = crypto.createDecipher(alg, key);
    const pass = decipher.update(pass_crypted, 'hex', 'utf8');
    return pass;
}