var crypto = require('crypto');
var dhInfo = require('../models/diffie-hellman-keys');

var DiffieHellman = {};

DiffieHellman.Start = function (req, res, next) {
    res.json({ success: true, key: dhInfo.serverKey });
    res.status(200);
    res.end();
};

DiffieHellman.Finish = function (req, res, next) {
    var clientKey = req.body['clientKey'];
    if (clientKey) {
        try {
            secret = dhInfo.dh.computeSecret(clientKey, 'hex', 'hex');
            dhInfo.keys[clientKey] = secret;
            res.json({ success: true });
        }
        catch (err) {
            console.log(err);
            res.status(500);
            res.json({ success: false });
            res.end();
        }
    }
    else
        res.json({ success: false });
    res.status(200);
    res.end();
};

DiffieHellman.Compare = function (req, res, next) {
    var clientKey = req.body['clientKey'];
    var clientSecret = req.body['clientSecret'];
    console.log(clientSecret);
    console.log(dhInfo.keys[clientKey]);
    res.json({ 'success': (clientKey && clientSecret && clientSecret == dhInfo.keys[clientKey]) });
    res.status(200);
    res.end();
};

module.exports = DiffieHellman;