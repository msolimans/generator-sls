"use strict";


const generators = require("yeoman-generator");
const fileReader = require("html-wiring");
const frameworks = require("../../common/frameworks");
const events = require("../../common/methodevents");
const pathhelper = require("../../common/paths");

/**
 * Updates the template.yaml file with the new routes
 * @param  {Object} route Object containing all the route names
 * @param  {String} file String representation of our file
 * @return {String} Our modified version of the input file
 */
function updateSamTemplate(route, file) {
    const hook = "### yeoman hook ###";
    let newFile = null;
    const insert = `  ${route.pascalName}Function:
    Type: AWS::Serverless::Function 
    Properties:
      CodeUri: bin/
      Handler: ${route.slugName}
      Runtime: go1.x
      Tracing: Active # https://docs.aws.amazon.com/lambda/latest/dg/lambda-x-ray.html
      Events:
        CatchAll:
          Type: Api # More info about API Event Source: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#api
          Properties:
            Path: /${route.slugName}
            Method: ${route.method.toUpperCase()}
      Environment: # More info about Env Vars: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#environment-object
        Variables:
          PARAM1: VALUE\n\n`;

    if (file.indexOf(insert) === -1) {
        newFile = file.replace(hook, insert + hook);
    }

    const outputHook = "### output yeoman hook ###";

    const output = `  ${route.pascalName}API:
    Description: "API Gateway endpoint URL for Prod environment for ${route.pascalName}"
    Value: !Sub "https://\${ServerlessRestApi}.execute-api.\${AWS::Region}.amazonaws.com/Prod/${route.slugName}/"\n
  ${route.pascalName}Function:
    Description: "${route.pascalName} Lambda Function ARN"
    Value: !GetAtt ${route.pascalName}Function.Arn\n
  ${route.pascalName}FunctionIamRole:
    Description: "Implicit IAM Role created for ${route.pascalName} function"
    Value: !GetAtt ${route.pascalName}FunctionRole.Arn\n\n`;

    if (newFile.indexOf(output) === -1) {
        newFile = newFile.replace(outputHook, output + outputHook);
    }

    return newFile;
}

/**
 * Updates the serverless.yml file with the new routes
 * @param  {Object} route Object containing all the route names
 * @param  {String} file String representation of our file
 * @return {String} Our modified version of the input file
 */
function updateServerless(route, file) {
    //route.method => event
    const hook = "### yeoman hook ###";
    let newFile = null;
    const insert = `  ${route.slugName}:\n` +
        `    handler: bin/${route.slugName}\n` +
        "    events:\n" +
        "      - http:\n" +
        `          path: ${route.slugName}\n` +
        `          method: ${route.method}\n` +
        "          cors: true\n";

    // events:
    //     - schedule: cron(0/2 * ? * MON-FRI *)
    //every 2nd minute from Monday to Friday
    //rate(value unit) (minute minutes hour hours day days)
    //cron(Minutes Hours Day-of-month Month Day-of-week Year)
    //https://github.com/serverless/examples/tree/master/aws-node-scheduled-cron

    if (file.indexOf(insert) === -1) {
        newFile = file.replace(hook, insert + hook);
    }

    return newFile;
}

function updateYamlFile(framework, route, file) {
    switch (framework.toLowerCase()) {
        case frameworks.serverless:
            return updateServerless(route, file);
        case frameworks.sam:
        default:
            return updateSamTemplate(route, file);
    }
}

function updateMakeFile(route, file) {
    const hook = "### yeoman hook ###";
    let newFile = null;
    const insert = `	GOARCH=amd64 GOOS=linux go build -gcflags="-N -l" -o bin/${route.slugName} ${route.slugName}/main.go\n`;

    if (file.indexOf(insert) === -1) {
        newFile = file.replace(hook, insert + hook);
    }

    return newFile;
}


/**
 * The route subgenerator
 */
const serverGenerator = generators.Base.extend({
    prompting: {


        ask() {

            return this.prompt([{
                name: "unitTest",
                message: "Unit Test Framework to be used?",
                type: "list",
                choices: ["Testify", "Convey"]
            }]).then((answers) => {
                this.unitTest = answers.unitTest;
            });
        }
    },
    writing: {

        routes() {

            const root = ".";

            // We get the serverless.yml file as a string
            const path = this.destinationPath(frameworks.getYamlFile(this.options.framework));
            let file = fileReader.readFileAsString(path);

            const makePath = this.destinationPath("Makefile");
            let makeFile = fileReader.readFileAsString(makePath);

            if (!this.fs.exists(this.destinationPath("apigw"))) {
                this.fs.copy(
                    this.templatePath(`${root}/apigw`),
                    this.destinationPath("apigw")
                );
            }

            // We process each route
            this.options.routes.forEach((route) => {
                // We check the route doesn"t already exists
                if (this.fs.exists(this.destinationPath(`${route.slugName}/main.go`))) {
                    this.log(`Route ${route.slugName} already exists`);
                    return;
                }

                if (events[route.method]) {
                    //events
                    this.fs.copyTpl(
                        this.templatePath(`../../../common/events/${events[route.method]}/event.json`),
                        this.destinationPath(`${route.slugName}/event.json`),
                        {
                            routeName: route.slugName,
                            method: route.method.toUpperCase()
                        }
                    );
                }

                let projName = pathhelper.dirname(process.cwd())[0];

                projName = pathhelper.basename(projName.substring(0, projName.length - 1));
                const cd = pathhelper.basename(process.cwd());

                this.fs.copyTpl(
                    this.templatePath(`${root}/main.go`),
                    this.destinationPath(`${route.slugName}/main.go`), {
                        APIGwPkg: `github.com/${projName}/${cd}/apigw`,
                        method: route.method.toUpperCase()
                    }
                );

                if (this.unitTest === "Testify") {
                    //unit test
                    this.fs.copyTpl(
                        this.templatePath(`${root}/main_test.go`),
                        this.destinationPath(`${route.slugName}/main_test.go`)
                    );
                } else {
                    //unit test
                    this.fs.copyTpl(
                        this.templatePath(`${root}/main_convey_test.go`),
                        this.destinationPath(`${route.slugName}/main_test.go`)
                    );
                }

                file = updateYamlFile(this.options.framework, route, file);
                makeFile = updateMakeFile(route, makeFile);


                this.fs.copyTpl(
                    this.templatePath(`${root}/Makefile`),
                    this.destinationPath(`${route.slugName}/Makefile`),
                    {
                        routeName: route.slugName
                    }
                );

            });

            // rewrite the serverless.yml
            this.write(path, file);

            //Makefile
            this.write(makePath, makeFile);
        },
    },
    sls2sam() {
        if (!this.options.__app) {
            //  this.spawnCommand("make")
            // this.spawnCommand("serverless", ["sam", "export", " --output", "template.yml"]);
        }
    }
});

module.exports = serverGenerator;
