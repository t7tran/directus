#!/usr/bin/env bash

# ensure it runs off the right directory
cd "$( dirname "$0" )"

pnpm add jsdom@22.0.0 \
         webdav-server@2.6.2