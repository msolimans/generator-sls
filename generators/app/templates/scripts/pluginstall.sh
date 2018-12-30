#!/usr/bin/env bash

cd $1
if [ ! -f package.json ]; then
    npm init -f
fi

npm install --save-dev $2
sls plugin install --name '${2}'