"use strict";


const yosay = require("yosay");
const generators = require("yeoman-generator");
const languages = require("../../common/languages");
/**
 * Golang Generators
 */
const serverGenerator = generators.Base.extend({


    writing: {

        welcome() {
            this.log(yosay(
                "Ready for Golang, Start writing ...."
            ));

        },

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

        frameworkWrites() {

            //readme and serverless|template
            this.fs.copyTpl(
                this.templatePath(`${this.options.props.framework}/*`),//more specific to framework type
                this.destinationPath(), {
                    projectName: this.options.props.projectName,
                    projectDescription: this.options.props.projectDescription,
                    projectVersion: this.options.props.projectVersion,
                    authorName: this.options.props.authorName,
                    authorEmail: this.options.props.authorEmail,
                }
            );

        },

        scripts() {
            this.fs.copyTpl(
                this.templatePath("./scripts/*"),
                this.destinationPath("./scripts"),{
                    projectName: this.options.props.projectName,
                }
            );

            this.fs.copy(
                this.templatePath("gomod.sh"),
                this.destinationPath("gomod.sh")
            );

        },

        config() {
            this.fs.copy(
                this.templatePath("config.json"),
                this.destinationPath("config.json")
            );

            this.fs.copyTpl(
                this.templatePath("slsattributes.json"),
                this.destinationPath("slsattributes.json"), {
                    framework: this.options.props.framework,
                    projectName: this.options.props.projectName,
                }
            );

        },
        vscode() {//todo: make it generic based on IDE selection
            this.fs.copy(
                this.templatePath("ide/vscode/launch.json"),
                this.destinationPath(".vscode/launch.json")
            );
        },

    },

    install() {
        this.composeWith("sls:route", {options: {__app: this.options.props.__app, language: languages.golang}});
        this.npmInstall();
    },


});

module.exports = serverGenerator;
