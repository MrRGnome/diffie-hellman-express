var crypto = require('crypto');

var dhInfo = {};

//active secrets and their pubkey association
dhInfo.keys = {};

console.log('Creating server pubkey, prime, and generator');
console.log('Please wait this may take a moment...');

dhInfo.dh = crypto.createECDH('secp521r1');

//server key generation info
dhInfo.serverKey = dhInfo.dh.generateKeys('hex');
console.log('Generated server pubkey, prime, and generator. Ready.');

module.exports = dhInfo;