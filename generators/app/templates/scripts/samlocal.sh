#!/usr/bin/env bash
# 0: test
# 1: funcName: the directory name is enough
# 2: event: path to event file
# 3: network: docker network
# 4: changeName (converts to projectName_envName_funcName)
# 5: environment: dev, qa, prod = dev by default 
# 6: debug flag, false by default 
proj="<%=projectName%>"
proj="$(tr '[:lower:]' '[:upper:]' <<< ${proj:0:1})${proj:1}"
env="$(tr '[:lower:]' '[:upper:]' <<< ${5:0:1})${5:1}"

debug=false

if [[ ! -z "${6}" ]]; then
    echo 'DEBUG is enabled!'
    debug=true
fi

if [[ -z "$env" ]]; then
    echo "No environment passed, applying dev"
    env="Dev"
fi

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
if [[ ! -z "$4" ]]; then
    echo "export mode on"
    func="${proj}${env}${func}" #export mode
else 
    echo "direct sam call, adding suffix Function"
    func="${func}Function" #not export mode
fi

callfn() {
    if [[ -z "$1" ]]; then
        echo "No docker network specified, applying default docker0"
        echo "sam local invoke --debug  --region us-east-1 --event ${event} ${func}"
        sam local invoke --debug  --region us-east-1 --event ${event} ${func}
    else
        echo "Docker Network"
        network="$3"
        echo "sam local invoke --debug  --region us-east-1 --docker-network ${network} --event ${event} ${func}"
        sam local invoke --debug  --region us-east-1 --docker-network ${network} --event ${event} ${func}
    fi
}

debugfn(){
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
}

if [[ "$debug" = true ]]; then
    debugfn $3
else 
    callfn $3 
fi 
 
