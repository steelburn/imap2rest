var criteria = {
    since: function(v) {
        return ['SINCE', v];
    }
};

exports.prepare = function (name, value) {
    var lowercaseName = name.toLowerCase();
    if (criteria[lowercaseName] == undefined) {
        throw new Error('Unknown search criterion: ' + name);
    }
    return criteria[lowercaseName](value);
}
