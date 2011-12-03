var criteria = require('./criteria');

exports.attachTo = function(app) {
    require('./handlers/mailbox')(app);
    require('./handlers/message')(app);
};
