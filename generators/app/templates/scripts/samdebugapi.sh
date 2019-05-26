#!/usr/bin/env bash

echo "$(tput setaf 1) * Now Call API route from browser or POSTMAN, then open VisualStudio Code, put a breakpoint and start debugging!$(tput sgr0)"

if [[ -z "${1}" ]]; then
     sam local start-api -d 8997 --debugger-path ./scripts/linux --region us-east-1
else
    sam local start-api -d 8997 --debugger-path ./scripts/linux --region us-east-1 --docker-network ${1}
fi