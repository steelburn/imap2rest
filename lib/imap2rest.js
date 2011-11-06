var express     = require('express');
var imap        = require('./imap');
var handlers    = require('./handlers');

exports.createServer = function(config) {
    return new Server(config);
};

function Server(config) {
    this.config = config;
    this.app = express.createServer();
    this.app.imap = imap.createClient(this.config.imap);
}

Server.prototype.start = function(callback) {
    this.app.imap.connect(function(err) {
        if (err) {
            if (callback) {
                return callback(err);
            } else {
                throw err;
            }
        }

        var cb = callback || function(){};

        handlers.attachTo(this.app);
        this.app.listen(this.config.http.port, this.config.http.host, cb);
    }.bind(this));
};
