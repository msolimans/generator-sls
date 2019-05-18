#!/usr/bin/env bash

path="${1}/.vscode"
if [[ ! -d ${path} ]]; then
    mkdir ${path}
fi

cd ${path}

echo "{
    \"version\": \"0.2.0\",
    \"configurations\": [
    {
        \"name\": \"Connect to Lambda container\",
        \"type\": \"go\",
        \"request\": \"launch\",
        \"mode\": \"remote\",
        \"remotePath\": \"\",
        \"port\": 8997,
        \"host\": \"127.0.0.1\",
        \"program\": \"${workspaceRoot}\",
        \"apiVersion\": 1,
        \"env\": {},
        \"args\": [],
      },
    ]
  }" > launch.json