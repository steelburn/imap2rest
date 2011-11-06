var express     = require('express');
var config      = require('./config');
var imap        = require('./imap');
var handlers    = require('./handlers');

var app = express.createServer();
app.imap = imap.createClient(config.imap);
app.imap.connect(function(err) {
    if (err) throw err;
    handlers.attachTo(app);
    app.listen(config.http.port, config.http.host);
});
