#!/bin/sh

# start server on node:
echo "starting 'node dist/server.js'"
ls -l dist/server.js
node dist/server.js &
sleep 10

echo "$@"
exec "$@"

