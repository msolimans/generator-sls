#!/usr/bin/env bash
if [[ -z "${1}" ]]; then
    echo "Running local API!"
    if [[ -z "${2}" ]]; then
        sam local start-api
    else
        sam local start-api --docker-network ${2}
    fi

else
    echo "$(tput setaf 1) * Now Call API route from browser or POSTMAN, then open VisualStudio Code, put a breakpoint and start debugging!$(tput sgr0)"

    if [[ -z "${2}" ]]; then
         echo "No Network Passed, Applying default network!"
         sam local start-api -d 8997 --debugger-path ./scripts/linux --region us-east-1
    else
        echo "Running inside network ${2}"
        sam local start-api -d 8997 --debugger-path ./scripts/linux --region us-east-1 --docker-network ${2}
    fi
fi