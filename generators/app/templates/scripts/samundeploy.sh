#!/bin/sh
# chk whether stack name exists (service was deployed before)
if [[ -f .stackname ]]; then
    stackname=`cat .stackname`
else
    echo "This stack was not deployed before!"
    exit 1
fi
echo "deleting!"
aws cloudformation delete-stack --stack-name ${stackname} && aws cloudformation wait stack-delete-complete --stack-name ${stackname} && echo "done"