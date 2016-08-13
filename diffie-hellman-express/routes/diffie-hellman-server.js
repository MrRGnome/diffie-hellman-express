var crypto = require('crypto');

var DiffieHellman = {};
DiffieHellman.keys = {};

DiffieHellman.Start = function (req, res, next) {
    var keyInfo = {};
    var dh = crypto.createDiffieHellman(2048);
    keyInfo.key = dh.generateKeys('hex');
    keyInfo.prime = dh.getPrime('hex');
    keyInfo.generator = dh.getGenerator('hex');
    DiffieHellman.keys[keyInfo.key] = {dh: dh};
    res.json(keyInfo);
    res.status(200);
    res.end();
};

DiffieHellman.Finish = function (req, res, next) {
    var serverKey = req.body['serverKey'];
    var clientKey = req.body['clientKey'];
    if (serverKey && clientKey) {
        secret = DiffieHellman.keys[serverKey].dh.computeSecret(clientKey);
        DiffieHellman.keys[serverKey].secret = secret;
        DiffieHellman.keys[serverKey].expiry = Date.now() + (60 * 60 * 1000);
        res.json({ 'success': true });
    }
    else
        res.json({ 'success': false });
    res.status(200);
    res.end();
};

module.exports = DiffieHellman;