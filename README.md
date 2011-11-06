imap2rest
=========

IMAP 2 REST interface.

What's implemented
------------------

    curl http://localhost:8080/ && echo
    ["Chats","Contacts","Drafts","Emailed Contacts","INBOX","Junk","Sent","Trash"]

    curl http://localhost:8080/INBOX/search?since=November%201,%202011"
    ["790","791","792", ...skipped..., "852"]

Installation
------------

    git clone --recursive http://github.com/laggyluke/imap2rest.git
    sudo npm link

Running
-------

imap2rest is configured using following environment variables:

    HTTP_HOST -- host to bind web server to (default: '0.0.0.0')
    HTTP_PORT -- host and port to bind web server to (default: '8080')

    IMAP_USERNAME -- IMAP username e.g. 'user@exampe.com'
    IMAP_PASSWORD -- password for IMAP_USERNAME
    IMAP_HOST -- IMAP server host (default: 'localhost')
    IMAP_PORT -- IMAP server port (default: '143' or '993', depending on IMAP_SECURE)
    IMAP_SECURE -- should we use SSL or not, (default: true)

You can specify these setting inline:

    $ IMAP_USERNAME=foo IMAP_PASSWORD=bar imap2rest
    Server started.

or, more conveniently, inside a shell script:

    $ cat start.sh
    #!/bin/bash
    export IMAP_USERNAME=foo
    export IMAP_PASSWORD=bar
    imap2rest
    $ ./start.sh
    Server started.
