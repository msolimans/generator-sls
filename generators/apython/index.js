"use strict";

const generators = require("yeoman-generator");

/**
 * Python Generator
 */
const serverGenerator = generators.Base.extend({


    writing: {

        git() {
            this.fs.copy(
                this.templatePath("gitattributes"),
                this.destinationPath(".gitattributes")
            );
            this.fs.copy(
                this.templatePath("gitignore"),
                this.destinationPath(".gitignore")
            );
        },

        readMe() {
            this.fs.copyTpl(
                this.templatePath("README.md"),
                this.destinationPath("README.md"), {
                    projectName: this.options.props.projectName,
                    projectDescription: this.options.props.projectDescription,
                }
            );
        },


        serverlessYaml() {
            this.fs.copyTpl(
                this.templatePath("serverless.yml"),
                this.destinationPath("serverless.yml"), {
                    projectName: this.options.props.projectName,
                }
            );
        },

        config() {
            this.fs.copy(
                this.templatePath("config.json"),
                this.destinationPath("config.json")
            );

            this.fs.copy(
                this.templatePath("slsattributes.json"),
                this.destinationPath("slsattributes.json")
            );
        },
    },

    install() {
        this.composeWith("sls:route", {options: {__app: this.options.props.__app, language: "python"}});
    },


});

module.exports = serverGenerator;
