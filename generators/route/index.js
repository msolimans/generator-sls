"use strict";

const to = require("to-case");
const generators = require("yeoman-generator");
const fileReader = require("html-wiring");

/**
 * Generates the different types of names for our routes
 * @param {String} routeName Route Name
 * @return {Array} Route objetcs
 */
const genRoutesNames = (routeName) => {
    const routeNames = {
        name: routeName,
        slugName: to.slug(routeName),
        pascalName: to.pascal(routeName),
        camelName: to.camel(routeName),
    };

    return routeNames;
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
                filter: answer => answer.split(","),
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

            if (this.options.language) {
                slsAttributes.language = this.options.language;
            } else {
                const slsAttributesPath = this.destinationPath("slsattributes.json");
                slsAttributes = fileReader.readFileAsString(slsAttributesPath);
                slsAttributes = JSON.parse(slsAttributes);
                if (!slsAttributes.language) {
                    slsAttributes.language = "golang";
                }
            }

            this.composeWith(`sls:r${slsAttributes.language}`,
                {
                    options: {
                        __app: this.options.__app,
                        language: slsAttributes.language,
                        routes: this.routes
                    }
                });
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
