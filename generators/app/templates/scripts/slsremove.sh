#!/usr/bin/env bash

dir=${1}
profile=${2}

cd ${dir}

if [ $profile ]; then
    sls remove --aws-profile $profile
else
    sls remove
fi