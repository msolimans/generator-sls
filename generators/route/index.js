"use strict";

const to = require("to-case");
const generators = require("yeoman-generator");
const fileReader = require("html-wiring");
const frameworks = require("../../common/frameworks");
const languages = require("../../common/languages");
const events = require("../../common/methodevents");

/**
 * Generates the different types of names for our routes
 * @param {String} routeName Route Name
 * @return {{camelName: *, name: String, slugName: *, pascalName: *}} Route objetcs
 */
const genRoutesNames = (routeName) => {
    return {
        name: routeName,
        slugName: to.slug(routeName),
        pascalName: to.pascal(routeName),
        camelName: to.camel(routeName),
    };
};

/**
 * The route subgenerator
 */
const serverGenerator = generators.Base.extend({

    prompting: {

        ask() {
            return this.prompt([{
                name: "routes",
                type: "input",
                message: "Route(s) name(s): (singular or comma separated)",
                filter: (answer) => answer.split(","),
                default: "route1, route2",
            },
            ]).then((answers) => {
                this.routes = answers.routes.map(genRoutesNames);
            });
        },
        method() {
            const prompts = [];

            // We prepare the prompst for each route
            this.routes.forEach((route) => {

                prompts.push({
                    name: `method-${route.camelName}`,
                    type: "list",
                    message: `Route ${route.slugName} method:`,
                    choices: [
                        "get",
                        "post",
                        "put",
                        "delete",
                        "cron",
                        "none",
                    ],
                    default: "get",
                });
            });

            return this.prompt(prompts).then((answers) => {
                this.routes.forEach((route) => {
                    route.method = answers[`method-${route.camelName}`];
                });
            });
        },
    },
    writing: {

        routes() {

            let slsAttributes = {};

            if (!this.options.language || !this.options.framework || !this.options.projectName) {
                const slsAttributesPath = this.destinationPath("slsattributes.json");

                slsAttributes = fileReader.readFileAsString(slsAttributesPath);
                slsAttributes = JSON.parse(slsAttributes);

                //language
                if (!this.options.language && !slsAttributes.language) {
                    slsAttributes.language = languages.golang;
                } else if (this.options.language) {
                    slsAttributes.language = this.options.language;
                }

                //framework
                if (!this.options.framework && !slsAttributes.framework) {
                    slsAttributes.framework = frameworks.sam;
                } else if (this.options.framework) {
                    slsAttributes.framework = this.options.framework;
                }

                //projectName
                if (!this.options.projectName && !slsAttributes.projectName) {
                    slsAttributes.projectName = "aws-sample";
                } else if (this.options.projectName) {
                    slsAttributes.projectName = this.options.projectName;
                }
            } else {
                slsAttributes.language = this.options.language;
                slsAttributes.framework = this.options.framework;
                slsAttributes.projectName = this.options.projectName;
            }

            this.composeWith(`sls:r${slsAttributes.language}`,
                {
                    options: {
                        __app: this.options.__app,
                        language: slsAttributes.language,
                        framework: slsAttributes.framework,
                        projectName: slsAttributes.projectName,
                        routes: this.routes
                    }
                });
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
