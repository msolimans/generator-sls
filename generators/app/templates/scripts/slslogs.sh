#!/usr/bin/env bash

dir=${1}
func=${2}
profile=${3}

if [ -d $dir ]; then
    cd $dir && cd ..
    echo "Current Directory: `pwd`"
else
    echo "directory doesn't exist!"
fi

if [ $profile ]; then
    sls logs -f $func --aws-profile $profile --tail
else
    sls logs -f $func --tail
fi