const ENCRYPTION_KEY = process.env._KEY;
const crypto = require('crypto');
const algorithm = 'aes-192-cbc';

module.exports.crypt = function(pass){
    // Use the async `crypto.scrypt()` instead.
    const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 24);
    // Use `crypto.randomBytes` to generate a random iv instead of the static iv
    // shown here.
    const iv = Buffer.alloc(16, 0); // Initialization vector.

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(pass, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    //console.log(encrypted);
    return encrypted;
}


module.exports.decrypt = function(pass){
    // Use the async `crypto.scrypt()` instead.
    const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 24);
    // The IV is usually passed along with the ciphertext.
    const iv = Buffer.alloc(16, 0); // Initialization vector.
    
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    
    // Encrypted using same algorithm, key and iv.
    let decrypted = decipher.update(pass, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

/*
module.exports.crypt = function(pass){
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(pass);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

module.exports.decrypt = function(pass_crypted){
    let textParts = pass_crypted.split(':');
    let iv = new Buffer(textParts.shift(), 'hex');
    let encryptedText = new Buffer(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}
*/