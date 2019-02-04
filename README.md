# Generator Serverless

[![NPM Badge](https://img.shields.io/npm/v/generator-sls.svg)](https://www.npmjs.com/package/generator-sls)
![](https://img.shields.io/npm/dt/generator-sls.svg)
![](https://img.shields.io/github/license/msolimans/generator-sls.svg)
[![](https://img.shields.io/github/languages/count/msolimans/generator-sls.svg)](https://github.com/msolimans/generator-sls/search?l=JSON)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/12d543d7665b42c0b072141276012dd2)](https://www.codacy.com/app/msolimans/generator-sls?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=msolimans/generator-sls&amp;utm_campaign=Badge_Grade)
[![](https://img.shields.io/gitter/room/generator-sls/community.svg)](https://gitter.im/generator-sls/community#)


Yeoman generator for a lambda Serverless project

## Requirements

*   Language of choice (Go 1.11, Python 2.7+, NodeJS 6+, .NET Core 2+, Java 8) 
*   Yeoman >= V1.8.5

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
*   Support of SAM 
*   Support of Serverless 
*   Local Invoke/Debug 

## Roadmap

*   Support of Go  
*   Support of NodeJS
*   Support of Python 
*   Support of Java 
*   Support of C# 
*   Support of different types of events for lambda function  
*   Simplifying local invoke/debug of lambda or apis (Support of SAM)
*   Orchestration and support of domains  
*   Deployment using (Terraform, Amplify, SAM, Apex, or Serverless)
*   Auto generate scripts for simplifying serverless development in different IDEs (Visual Studio Code, Intellij, PyCharm, WebStorm, and Goland)
*   Choose Unit test framework to be used


## Resources:

*   <https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-debugging-golang.html>
* <https://github.com/awslabs/aws-sam-cli/issues/326>
* <https://github.com/awslabs/aws-sam-cli>
* <https://github.com/Microsoft/vscode-go/wiki/Debugging-Go-code-using-VS-Code>
* <https://github.com/sapessi/serverless-sam>
* <https://github.com/awslabs/aws-amplify-serverless-plugin/blob/master/example/serverless.yml>
* <https://code.visualstudio.com/docs/editor/variables-reference>