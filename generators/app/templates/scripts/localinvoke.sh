#!/usr/bin/env bash

event="$1/event.json"
network=""
if [[ -z "$2" ]]; then
    echo "No events passed, applying default from $event"
else
    echo "Applying passed events"
    event=$2
fi

if [[ -z "$3" ]]; then
    echo "No docker network specified, applying default docker0"
    echo "docker run --rm -v $PWD/bin:/var/task lambci/lambda:go1.x $1 '$(cat ${event})'"
    docker run --rm -v $PWD/bin:/var/task lambci/lambda:go1.x $1 '$(cat $event)'
else
    network="$3"
    echo "Docker Network Specified: ${network}"
    echo "docker run --rm -v $PWD/bin:/var/task --network ${network} lambci/lambda:go1.x $1 '$(cat ${event})'"
    docker run --rm -v $PWD/bin:/var/task --network ${network} lambci/lambda:go1.x $1 '$(cat $event)'
fi