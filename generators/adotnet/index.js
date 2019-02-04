"use strict";


const yosay = require("yosay");
const generators = require("yeoman-generator");

/**
 * DotNet Generator
 */
const serverGenerator = generators.Base.extend({


    writing: {

        welcome() {
            this.log(yosay(
                "Ready for Dotnet, Start writing ...."
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

        readMe() {
            this.fs.copyTpl(
                this.templatePath("README.md"),
                this.destinationPath("README.md"), {
                    projectName: this.options.props.projectName,
                    projectDescription: this.options.props.projectDescription,
                }
            );
        },

        packageJSON() {
            this.fs.copyTpl(
                this.templatePath("package.json"),
                this.destinationPath("package.json"), {
                    projectName: this.options.props.projectName,
                    projectDescription: this.options.props.projectDescription,
                    projectVersion: this.options.props.projectVersion,
                    authorName: this.options.props.authorName,
                    authorEmail: this.options.props.authorEmail,
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
        makeFile() {
            this.fs.copyTpl(
                this.templatePath("Makefile"),
                this.destinationPath("Makefile"), {}
            )
        },
        build() {



            this.fs.copy(
                this.templatePath("aws-csharp.csproj"),
                this.destinationPath("aws-csharp.csproj")
            );

            this.fs.copy(
                this.templatePath("build.sh"),
                this.destinationPath("build.sh")
            );

            this.fs.copy(
                this.templatePath("build.cmd"),
                this.destinationPath("build.cmd")
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
        vscode() {
            this.fs.copy(
                this.templatePath("launch.json"),
                this.destinationPath(".vscode/launch.json")
            )
        },

    },

    install() {
        this.composeWith("sls:route", {options: {__app: this.options.__app, language: "dotnet"}});
        this.npmInstall();
    },


});

module.exports = serverGenerator;
