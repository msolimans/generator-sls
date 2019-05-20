"use strict";

const generators = require("yeoman-generator");
const fileReader = require("html-wiring");

/**
 * Updates the serverless.yml file with the new routes
 * @param  {Object} route Object containing all the route names
 * @param  {String} file String representation of our file
 * @return {String} Our modified version of the input file
 */
function updateYamlFile(route, file) {
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

    writing: {

        routes() {

            const dest = `./${this.options.projectName}`;
            const testDest = `./${this.options.projectName}.Tests`;

            // We get the serverless.yml file as a string
            const path = this.destinationPath(`${dest}/serverless.yml`);
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


                file = updateYamlFile(route, file);
                makeFile = updateMakeFile(route, makeFile);


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

            //Makefile
            this.write(makePath, makeFile);
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
