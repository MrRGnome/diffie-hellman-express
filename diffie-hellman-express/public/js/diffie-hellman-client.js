var crypto = require('crypto');

$('#log').append('<p>' + Date.now() + ': Loaded crypto module via browserify, calling crypto.createECDH()</p>');
//var dh = crypto.createDiffieHellman(sessionStorage['prime'], 'hex', sessionStorage['generator'], 'hex');
var dh = crypto.createECDH('secp521r1');

$('#log').append('<p>' + Date.now() + ': Created Diffie Hellman object, calling generateKeys()</p>');
sessionStorage['clientPubKey'] = dh.generateKeys('hex');

$('#log').append('<p>' + Date.now() + ': Keys generated! Computing secret</p>');
sessionStorage['secret'] = dh.computeSecret(sessionStorage['serverPubKey'], 'hex', 'hex');

$('#log').append('<p>' + Date.now() + ': Got secret, sending pubkey to server </p>');
$.post('/diffie-hellman/finish', { clientKey: sessionStorage['clientPubKey'] }).done(function (result) {
    if (result && result.success) {
        $('#log').append('<p>' + Date.now() + ': Handshake complete! Ready for HMAC or encryption</p>');
        $('#log').append('<p>' + Date.now() + ': Running Test - Invalidating secret, sending to server to compare for success:</p>');
        $.post('/diffie-hellman/compare', { clientKey: sessionStorage['clientPubKey'], clientSecret: sessionStorage['secret'] }).done(function (result) {
            if (result && result.success)
                $('#log').append('<p>' + Date.now() + ': Success! Handshake successfully generated the same secret client and server side </p>');
            else
                $('#log').append('<p>' + Date.now() + ': Handshake created different keys, make sure keys are being checked in the same format </p>');
        });
    }
        
    else
        $('#log').append('<p>' + Date.now() + ': Handshake failed to complete, check server logs </p>');

    
}).fail(function (xhr, status, error) {
    $('#log').append('<p>' + Date.now() + ': Handshake failed to complete, check server logs </p>');
    });