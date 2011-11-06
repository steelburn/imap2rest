var nodeImap = new require('imap');

exports.createClient = function(config) {
    return nodeImap.ImapConnection(config);
};

