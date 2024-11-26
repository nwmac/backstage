#!/usr/bin/env bash

echo "Starting Backstage"

node /app/update-config
node packages/backend --config app-config-rancher.yaml
