"use strict";

const generators = require("yeoman-generator");
const fileReader = require("html-wiring");
const frameworks = require("../../common/frameworks");
const events = require("../../common/methodevents");

/**
 * Updates the serverless.yml file with the new routes
 * @param  {Object} route Object containing all the route names
 * @param  {String} file String representation of our file
 * @return {String} Our modified version of the input file
 */

function updateYamlFile(framework, route, file) {
    switch (framework.toLowerCase()) {
        case frameworks.serverless:
            return updateServerless(route, file);
        case frameworks.sam:
        default:
            return updateSamTemplate(route, file);
    }
}


function updateServerless(route, file) {
    const hook = "### yeoman hook ###";
    let newFile = null;

    // slugName:
    //     handler: CsharpHandlers::AwsDotnetCsharp.camelCase>>Handler::Run

    const insert = `  ${route.slugName}:\n` +
        `    handler: CsharpHandlers::AwsDotnetCsharp.${route.pascalName}Handler::Run\n` +
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


function updateSamTemplate(route, file) {
    //todo
}

/**
 * The route subgenerator
 */
const serverGenerator = generators.Base.extend({

    writing: {

        routes() {

            const dest = `./${this.options.projectName}`;
            const testDest = `./${this.options.projectName}.Tests`;

            // We get the serverless.yml file as a string
            const path = this.destinationPath(`${dest}/${frameworks.getYamlFile(this.options.framework)}`);
            let file = fileReader.readFileAsString(path);

            const makePath = this.destinationPath(`${dest}/Makefile`);
            let makeFile = fileReader.readFileAsString(makePath);


            // We process each route
            this.options.routes.forEach((route) => {
                this.log(route.slugName);
                this.log(route.camelName);
                this.log(route.pascalName);

                // We check the route doesn"t already exists
                if (this.fs.exists(this.destinationPath(`${route.pascalName}Handler.cs`))) {
                    this.log(`Route exists, ${route.pascalName}Handler.cs already exists`);
                    return;
                }

                const root = ".";


                if (events[route.method]) {
                    //events
                    this.fs.copyTpl(
                        this.templatePath(`../../../common/events/${events[route.method]}/event.json`),
                        this.destinationPath(`${dest}/${route.slugName}_event.json`),
                        {
                            routeName: route.slugName,
                            method: route.method.toUpperCase()
                        }
                    );
                }


                if (!this.fs.exists(this.destinationPath("Main.cs"))) {
                    this.fs.copyTpl(this.templatePath(`${root}/Main.cs`),
                        this.destinationPath(`${dest}/Main.cs`),
                        {
                            ProjectName: this.options.projectName
                        }
                    );
                }

                this.fs.copyTpl(
                    this.templatePath(`${root}/Handler.cs`),
                    this.destinationPath(`${dest}/${route.pascalName}Handler.cs`), {
                        Prefix: route.pascalName,
                        ProjectName: this.options.projectName,
                    }
                );

                this.fs.copyTpl(
                    this.templatePath(`${root}/Request.cs`),
                    this.destinationPath(`${dest}/${route.pascalName}Request.cs`),
                    {
                        Prefix: route.pascalName,
                        ProjectName: this.options.projectName,
                    }
                );

                this.fs.copyTpl(
                    this.templatePath(`${root}/Response.cs`),
                    this.destinationPath(`${dest}/${route.pascalName}Response.cs`),
                    {
                        Prefix: route.pascalName,
                        ProjectName: this.options.projectName,
                    }
                );

                this.fs.copyTpl(
                    this.templatePath(`${root}/Response.cs`),
                    this.destinationPath(`${testDest}/${route.pascalName}Response.cs`),
                    {
                        Prefix: route.pascalName,
                        ProjectName: this.options.projectName,
                    }
                );

                this.fs.copyTpl(
                    this.templatePath(`${root}/HandlerTest.cs`),
                    this.destinationPath(`${testDest}/${route.pascalName}HandlerTest.cs`), {
                        Prefix: route.pascalName,
                        ProjectName: this.options.projectName,
                    }
                );


                file = updateYamlFile(this.options.framework, route, file);


                // this.fs.copyTpl(
                //     this.templatePath(`${root}/Makefile`),
                //     this.destinationPath(`${route.slugName}/Makefile`),
                //     {
                //         routeName: route.slugName
                //     }
                // );

            });

            // rewrite the serverless.yml
            this.write(path, file);

        },
    },
    sls2sam() {
        if (!this.options.__app) {
            //  this.spawnCommand("make")
            // this.spawnCommand("sls", ["sam", "export", " --output", "template.yml"]);
        }
    }
});

module.exports = serverGenerator;
