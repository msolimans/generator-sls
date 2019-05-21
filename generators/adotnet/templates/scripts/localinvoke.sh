#!/usr/bin/env bash

event="$1_event.json"
network=""

if [[ -z "${2}" ]]; then
    echo "No events passed, applying default from ${event}"
else
    echo "Applying passed events"
    event=${2}
fi

content=$(cat ${event})

if [[ -z "$3" ]]; then
    echo "No docker network specified, applying default docker0"
    echo "docker run --rm -v $PWD/bin:/var/task lambci/lambda:dotnetcore2.1 ${1} $content"
    docker run --rm -v ${PWD}/bin/release/netcoreapp2.1/publish:/var/task lambci/lambda:dotnetcore2.1 <%=projectName%>::<%=projectName%>.${1}::Run "${content}"
else
    network="$3"
    echo "Docker Network Specified: ${network}"
    echo "docker run --rm -v $PWD/bin:/var/task --network ${network} lambci/lambda:dotnetcore2.1 ${1} ${content}"
    docker run --rm -v $PWD/bin/release/netcoreapp2.1/publish:/var/task --network ${network} lambci/lambda:dotnetcore2.1 <%=projectName%>::<%=projectName%>.${1}::Run "${content}"
fi