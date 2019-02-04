#!/usr/bin/env bash

path="${1}/.vscode"
if [ ! -d ${path} ]; then
    mkdir ${path}
fi

cd ${path}

echo "{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://rgolang.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
                "name": "Connect to Lambda container",
                "type": "rgolang",
                "request": "launch",
                "mode": "remote",
                "remotePath": "",
                "port": 8997,
                "host": "127.0.0.1",
                "program": "${workspaceRoot}",
                "env": {},
                "args": [],
                "apiVersion": 1
        }


    ]
}" > launch1.json