var crypto = require('crypto');

$('#log').append('<p>' + Date.now() + ': Loaded crypto module via browserify, calling crypto.createDiffieHellman() with server prime and generator</p>');
var dh = crypto.createDiffieHellman(sessionStorage['prime'], 'hex', sessionStorage['generator'], 'hex');

$('#log').append('<p>' + Date.now() + ': Created Diffie Hellman object, calling generateKeys</p>');
sessionStorage['clientPubKey'] = dh.generateKeys('hex');

$('#log').append('<p>' + Date.now() + ': Keys generated! Computing secret</p>');
sessionStorage['secret'] = dh.computeSecret(sessionStorage['serverPubKey'], 'hex', 'hex');

$('#log').append('<p>' + Date.now() + ': Got secret, sending pubkey to server </p>');
$.post('/diffie-hellman/finish', { clientKey: sessionStorage['clientPubKey'], serverKey: sessionStorage['serverPubKey'] }).done(function (result) {
    if (result && result.success)
        $('#log').append('<p>' + Date.now() + ': Handshake complete! Ready for HMAC</p>');
    else
        $('#log').append('<p>' + Date.now() + ': Handshake failed to complete, check server logs </p>');
});