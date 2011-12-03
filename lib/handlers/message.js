module.exports = function(app) {
    app.get('/:boxname/:id', function(req, res) {
        var boxname = req.params.boxname;
        var id = req.params.id;
        res.redirect('/' + boxname + '/' + id + '/headers', 501);
    });

    app.get('/:boxname/:id/headers', function(req, res) {
        var boxname = req.params.boxname;
        var id = req.params.id;
        app.imap.openBox(boxname, function(err, box) {
            if (err) return next(err);

            var fetch = app.imap.fetch(id);
            fetch.on('message', function(msg) {
                msg.on('end', function() {
                    res.send(msg.headers);
                });
            });
        });
    });

    app.get('/:boxname/:id/body', function(req, res, next) {
        var boxname = req.params.boxname;
        var id = req.params.id;
        app.imap.openBox(boxname, function(err, box) {
            if (err) return next(err);

            var request = {headers: false, body: true};
            var fetch = app.imap.fetch(id, {request: request});
            fetch.on('message', function(msg) {
                var body = '';
                msg.on('data', function(chunk) {
                    body += chunk;
                });

                msg.on('end', function() {
                    if (msg.structure.length != 1) {
                        return next(new Error('Only single-part messages are supported'));
                    }

                    var part = msg.structure[0];

                    if (part.params.charset) {
                        res.charset = part.params.charset;
                    }

                    var contentType = part.type + '/' + part.subtype;
                    res.contentType(contentType);
                    res.send(body);
                });
            });
        });
    });
};

function prepareContentType(msg) {
    var contentType = msg.type + '/' + msg.subtype;
    if (msg.params) {
        contentType += ';';

        for (var k in msg.params) {
            var v = msg.params[k];
            contentType += k + '=' + v;
        }
    }
    return contentType;
}
