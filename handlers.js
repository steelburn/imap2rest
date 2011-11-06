var _ = require('underscore');

exports.attachTo = function(app, callback) {
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
                query.push(prepareSearchCriterion(k, v));
            });

            app.imap.search(query, function(err, msgIds) {
                if (err) return next(err);
                res.send(msgIds);
            });
        });
    });
};

function prepareSearchCriterion(name, value) {
    var lowercaseName = name.toLowerCase();
    if (searchCriteria[lowercaseName] == undefined) {
        throw new Error('Unknown search criterion: ' + name);
    }
    return searchCriteria[lowercaseName](value);
}

var searchCriteria = {
    since: function(v) {
        return ['SINCE', v];
    }
}
