var crypto = require('crypto');

var dhInfo = {};

//active secrets and their pubkey association
dhInfo.keys = {};

console.log('Creating server pubkey, prime, and generator');
console.log('Please wait this may take a moment...');

dhInfo.dh = crypto.createDiffieHellman(2048);

//server key generation info
var serverKey = {};
serverKey.key = dhInfo.dh.generateKeys('hex');
serverKey.prime = dhInfo.dh.getPrime('hex');
serverKey.generator = dhInfo.dh.getGenerator('hex');
dhInfo.serverKey = serverKey;
console.log('Generated server pubkey, prime, and generator. Ready.');

module.exports = dhInfo;