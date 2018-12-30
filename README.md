# Generator Serverless

[![NPM Badge](https://img.shields.io/npm/v/generator-sls.svg)](https://www.npmjs.com/package/generator-sls)

Yeoman generator for a lambda Serverless project


## Requirements

* Go 1.x 
* Yeoman >= V1.8.5

## Generator installation
 
1) you are going to need [Yeoman](http://yeoman.io/):
```
npm install -g yo
```
2) Install the generator:

```bash
npm i -g generator-sls
```

## Usage

### Base generator

Once the link established, you can use it right away.
Create a new directory where you want your project to be and run it:
```
mkdir lambda-service
cd lambda-service
yo sls
```
It will prompt some questions you need to answer to configure your project.
Default values are specified between parenthesis.
You now have a starter skeleton for a lambda project!

### Sub-generator

After creating project/service, you can easily add a function/route by using the subgenerator. In the root directory of your project, run:
```
yo sls:route
```
Just like the base generator, it will prompt you to give the function(s) name(s).
It creates the handler files
 and modify the `serverless.yml` file according to.

## Unit Testing
### Generator unit tests
TODO

### Project unit tests
For every route created with the generator, a corresponding basic unit test file is added.

## Features
- Support of SAM 
- Support of Serverless 
- Local Invoke/Debug 

## Roadmap

- Support of NodeJS
- Support of different types of events for lambda function  
- Simplifying local invoke/debug of lambda or apis (Support of SAM)
- Orchestration and support of domains  
- Deployment using (Terraform, Amplify, SAM, Apex, or Serverless)

Resources:

https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-debugging-golang.html
https://github.com/awslabs/aws-sam-cli/issues/326
https://github.com/awslabs/aws-sam-cli
https://github.com/Microsoft/vscode-go/wiki/Debugging-Go-code-using-VS-Code
https://github.com/sapessi/serverless-sam
https://github.com/awslabs/aws-amplify-serverless-plugin/blob/master/example/serverless.yml