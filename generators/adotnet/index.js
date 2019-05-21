"use strict";


const languages = require("../../common/languages");

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
        frameworkWrites() {

            //readme and serverless|template
            this.fs.copyTpl(
                this.templatePath(`${this.options.props.framework}/*`),//more specific to framework type
                this.destinationPath(`${this.options.props.projectName}/`), {
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
                this.templatePath(`scripts/*`),
                this.destinationPath(`${this.options.props.projectName}/`), {
                    projectName: this.options.props.projectName,
                }
            );
        },

        build() {
            const dest = this.options.props.projectName;


            this.fs.copyTpl(
                this.templatePath("./MyService/aws-csharp.csproj"),
                this.destinationPath(`${dest}/${this.options.props.projectName}.csproj`),
                {
                    projectName: this.options.props.projectName,
                }
            );

            this.fs.copyTpl(
                this.templatePath("./MyService.Tests/MyService.Tests.csproj"),
                this.destinationPath(`${dest}.Tests/${this.options.props.projectName}.tests.csproj`), {
                    projectName: this.options.props.projectName,
                }
            );

            this.fs.copyTpl(
                this.templatePath("./scripts/*"),
                this.destinationPath(`${dest}/scripts/`),{
                    projectName: this.options.props.projectName,
                }
            );


        },


        config() {
            const dest = this.options.props.projectName;

            this.fs.copy(
                this.templatePath("./MyService/config.json"),
                this.destinationPath(`${dest}/config.json`)
            );

            this.fs.copyTpl(
                this.templatePath("slsattributes.json"),
                this.destinationPath("slsattributes.json"), {
                    framework: this.options.props.framework,
                    projectName: this.options.props.projectName,
                }
            );

        },
        vscode() {
            this.fs.copy(
                this.templatePath("launch.json"),
                this.destinationPath(".vscode/launch.json")
            );
        },

    },

    install() {
        this.composeWith("sls:route", {
            options: {
                __app: this.options.__app,
                projectName: this.options.props.projectName,
                language: languages.dotnet
            }
        });
        this.npmInstall();
    },


});

module.exports = serverGenerator;
