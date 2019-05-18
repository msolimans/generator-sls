#!/usr/bin/env bash

func="$(tr '[:lower:]' '[:upper:]' <<< ${1:0:1})${1:1}"
network=""
event="$1/event.json"

if [[ -z "$2" ]]; then
    echo "No events passed, applying default from ${event}"
else
    echo "Applying passed events"
    event=$2
fi

#handle exported sam naming diffs
if [[ -z "$4" ]]; then
    func="${func}Function"
fi

if [[ -z "$3" ]]; then
    echo "No docker network specified, applying default docker0"
    echo "sam local invoke -d 8997 --debugger-path ./scripts/linux --debug  --region us-east-1 --event ${event} ${func}"
    sam local invoke -d 8997 --debugger-path ./scripts/linux --debug  --region us-east-1 --event ${event} ${func}
else
    echo "Docker Network"
    network="$3"
    echo "sam local invoke -d 8997 --debugger-path ./scripts/linux --debug  --region us-east-1 --docker-network ${network} --event ${event} ${func}"
    sam local invoke -d 8997 --debugger-path ./scripts/linux --debug  --region us-east-1 --docker-network ${network} --event ${event} ${func}
fi