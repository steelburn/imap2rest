var config = exports;
config.http = {};
config.http.host = process.env.HTTP_HOST || '0.0.0.0';
config.http.port = process.env.HTTP_PORT || 8080;

config.imap = {};
config.imap.username = process.env.IMAP_USERNAME || '';
config.imap.password = process.env.IMAP_PASSWORD || '';
config.imap.secure = process.env.IMAP_SECURE == 'true' || true;
config.imap.host = process.env.IMAP_HOST || 'localhost';

if (process.env.IMAP_PORT) {
    config.imap.port = process.env.IMAP_PORT;
} else {
    config.imap.port = config.imap.secure ? 993 : 143;
}

