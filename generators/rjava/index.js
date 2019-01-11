'use strict';

const generators = require('yeoman-generator');
const fileReader = require('html-wiring');

/**
 * Updates the serverless.yml file with the new routes
 * @param  {Object} route Object containing all the route names
 * @param  {String} file String representation of our file
 * @return {String} Our modified version of the input file
 */
function updateYamlFile(route, file) {
    const hook = '### yeoman hook ###';
    let newFile = null;
    const insert = `  ${route.slugName}:\n` +
        `    handler: com.serverless.${route.pascalName}Handler\n` +
        '    events:\n' +
        '      - http:\n' +
        `          path: ${route.slugName}\n` +
        `          method: ${route.method}\n` +
        '          cors: true\n';

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


/**
 * Java Subgenerator
 */
const serverGenerator = generators.Base.extend({

    writing: {

        routes() {

            const root = `.`;

            const dstRoot = `src/main/java/com/serverless`;

            // We get the serverless.yml file as a string
            const path = this.destinationPath('serverless.yml');
            let file = fileReader.readFileAsString(path);

            if (!this.fs.exists(this.destinationPath(`src`))) {
                this.fs.copy(
                    this.templatePath(`${root}/src`),
                    this.destinationPath(`src`)
                );
            }

            // We process each route
            this.options.routes.forEach((route) => {
                // We check the route doesn't already exists
                if (this.fs.exists(this.destinationPath(`${dstRoot}/${route.pascalName}Handler.java`))) {
                    this.log(`Route exists, ${route.pascalName}Handler.java already exists`);
                    return;
                }

                this.fs.copyTpl(
                    this.templatePath(`${root}/Handler.java`),
                    this.destinationPath(`${dstRoot}/${route.pascalName}Handler.java`), {
                        Prefix: route.pascalName
                    }
                );

                //events
                this.fs.copyTpl(
                    this.templatePath(`${root}/event.json`),
                    this.destinationPath(`${dstRoot}/event_${route.slugName}.json`)
                );

                file = updateYamlFile(route, file);

            });

            // rewrite the serverless.yml
            this.write(path, file);


        },
    },
    sls2sam() {
        if (!this.options.__app) {
            //  this.spawnCommand('make')
            // this.spawnCommand('sls', ['sam', 'export', ' --output', 'template.yml']);
        }
    }
});

module.exports = serverGenerator;
