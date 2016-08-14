var crypto = require('crypto');
var dhInfo = require('../models/diffie-hellman-keys');

var DiffieHellman = {};

DiffieHellman.Start = function (req, res, next) {
    res.json(dhInfo.serverKey);
    res.status(200);
    res.end();
};

DiffieHellman.Finish = function (req, res, next) {
    var clientKey = req.body['clientKey'];
    if (clientKey) {
        try {
            secret = dhInfo.dh.computeSecret(new Buffer(JSON.parse(clientKey).data));
            dhInfo.keys[clientKey] = secret;
            res.json({ 'success': true });
        }
        catch (err) {
            res.status(500);
            res.json({ 'success': false });
            res.end();
        }
    }
    else
        res.json({ 'success': false });
    res.status(200);
    res.end();
};

DiffieHellman.Compare = function (req, res, next) {
    var clientKey = req.body['clientKey'];
    var clientSecret = req.body['clientSecret'];
    console.log(new Buffer(JSON.parse(clientSecret).data));
    console.log(dhInfo.keys[clientKey]);
    res.json({ 'success': (clientKey && clientSecret && new Buffer(JSON.parse(clientSecret).data) == dhInfo.keys[clientKey]) });
    res.status(200);
    res.end();
};

module.exports = DiffieHellman;