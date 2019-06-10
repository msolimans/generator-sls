#!/bin/sh
projectName=$1
region=$2
profile=$3


mb() {
    #1 s3bucket
    #2 profile
    if [[ -z "${2}" ]]; then
        aws s3 mb s3://${1}
    else
        aws s3 mb s3://${1} --profile ${2}
    fi
}

package() {
    #$1 s3bucket|stackname
    #$2 profile
    prefix="master/$(date '+%Y%m%d%H%M%S')"
    if [[ -z "${2}" ]]; then
        sam package --template-file template.yaml --s3-bucket $1 --s3-prefix ${prefix} --output-template-file ./generated-template.yaml
    else
        sam package --template-file template.yaml --s3-bucket $1 --s3-prefix ${prefix} --output-template-file ./generated-template.yaml --profile ${2}
    fi
}


deploy() {
    #$1 stackname
    #$2 region
    #$3 profile

    if [[ -z "${3}" ]]; then
        sam deploy --debug --template-file ./generated-template.yaml --stack-name ${1} --region ${2} --capabilities CAPABILITY_IAM
    else
        sam deploy --debug --template-file ./generated-template.yaml --stack-name ${1} --region ${2} --capabilities CAPABILITY_IAM  --profile ${3}
    fi
}


describe() {
    #$1 stackname
    #$2 region
    #$3 profile

    if [[ -z "${3}" ]]; then
        aws cloudformation describe-stacks --stack-name ${1} --region ${2}
    else
        aws cloudformation describe-stacks --stack-name ${1} --profile ${3} --region ${2}
    fi
}

if [[ -z "${region}" ]]; then
    echo "No region specified, default is us-east-1"
    region="us-east-1"
fi

# chk whether s3 bucket exists in stackname
if [[ -f .stackname ]]; then
    stackname=`cat .stackname`
else
    stackname=${projectName}$(date '+%Y%m%d%H%M%S')
    mb ${stackname} ${profile}
    echo ${stackname} > .stackname
fi

package ${stackname} ${profile}
deploy ${stackname} ${region} ${profile}
describe ${stackname} ${region} ${profile}
