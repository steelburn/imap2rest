var _ = require('underscore');

module.exports = function(app) {
    app.get('/', function(req, res) {
        app.imap.getBoxes(function(err, boxes) {
            if (err) return next(err);

            var output = _.map(boxes, function(box, boxname) {
                return boxname;
            });

            res.send(output);
        });
    });

    app.get('/:boxname/search', function(req, res) {
        var boxname = req.params.boxname;
        app.imap.openBox(boxname, function(err, box) {
            if (err) return next(err);

            var query = [];
            _.each(req.query, function(v, k) {
                query.push(criteria.prepare(k, v));
            });

            app.imap.search(query, function(err, msgIds) {
                if (err) return next(err);
                res.send(msgIds);
            });
        });
    });
};
