#!/usr/bin/env bash

event="${1}/event.json"
network=""
debug=false

if [[ ! -z "${4}" ]]; then
    echo 'DEBUG is enabled!'
    debug=true
fi

if [[ -z "${2}" ]]; then
    echo "No events passed, applying default from ${event}"
else
    echo "Applying passed events"
    event=${2}
fi

content=$(cat ${event})

if [[ -z "$3" ]]; then
    echo "No docker network specified, applying default docker0"
    
    if [[ "$debug" = true ]]; then
        echo "docker run --rm -p 8997:8997 -ti -v $PWD/bin/:/var/task -v $PWD/scripts/linux:/tmp/lambci_debug_files lambci/lambda:go1.x -debug=true -delvePort=8997 route1 ${content}"
        docker run --rm -p 8997:8997 -ti -v $PWD/bin/:/var/task -v $PWD/scripts/linux:/tmp/lambci_debug_files lambci/lambda:go1.x -debug=true -delvePort=8997 ${1} "${content}"
    else
        echo "docker run --rm -v $PWD/bin:/var/task lambci/lambda:go1.x ${1} ${content}"
        docker run --rm -v ${PWD}/bin:/var/task lambci/lambda:go1.x ${1} "${content}"
    fi
    
else
    network="${3}"
    echo "Docker Network Specified: ${network}"
    
    if [[ "$debug" = true ]]; then
        echo "docker run --rm -p 8997:8997 -ti --network ${network} -v $PWD/bin/:/var/task -v $PWD/scripts/linux:/tmp/lambci_debug_files lambci/lambda:go1.x -debug=true -delvePort=8997 route1 ${content}"
        docker run --rm -p 8997:8997 -ti --network ${network} -v $PWD/bin/:/var/task -v $PWD/scripts/linux:/tmp/lambci_debug_files lambci/lambda:go1.x -debug=true -delvePort=8997 ${1} "${content}"
    else
        echo "docker run --rm -v $PWD/bin:/var/task --network ${network} lambci/lambda:go1.x $1 ${content}"
        docker run --rm -v $PWD/bin:/var/task --network ${network} lambci/lambda:go1.x ${1} "${content}"
    fi
    
fi
 