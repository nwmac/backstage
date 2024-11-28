#!/bin/bash

echo "Starting Backstage"

export NODE_TLS_REJECT_UNAUTHORIZED=0
export NODE_OPTIONS=--no-node-snapshot

node /app/update-config
node packages/backend --config app-config-rancher.yaml

echo "Exited"

echo "Debug"

tail -f /dev/null
