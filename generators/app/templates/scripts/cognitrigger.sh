#!/usr/bin/env bash

region="us-east-1"
pool=${1}
arnlambda=${2}
action=${3}

if [ ${action} ]; then
    action="PostConfirmation"
fi

aws cognito-idp update-user-pool --profile sandbox --region ${region} --user-pool-id ${pool} --lambda-config ${action}=${arnlambda}