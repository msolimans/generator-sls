#!/usr/bin/env bash

dir=${1}
func=${2}
profile=${3}

if [ -d "${dir}" ]; then
    cd ${dir} && cd ..
fi

echo "Start Building!"

make

echo "Publishing function ${func} using AWS Profile ${profile}"

if [ ${profile} ]; then
   sls deploy -v --aws-profile ${profile} -f ${func}
else
   sls deploy -v -f ${func}
fi