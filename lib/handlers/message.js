module.exports = function(app) {
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
};
