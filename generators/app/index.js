"use strict";

const path = require("path");
const yosay = require("yosay");
const to = require("to-case");
const generators = require("yeoman-generator");

/**
 * Our main generator
 */
const serverGenerator = generators.Base.extend({
    prompting: {
        welcome() {
            this.log(yosay(
                "Hello there, let\"s create a serverless architecture together!"
            ));
        },

        ask() {
            return this.prompt([
                {
                    name: "language",
                    type: "list",
                    message: "What is the runtime language?",
                    choices: [
                        "Golang",
                        "NodeJS",
                        "DotNet",
                        "Python",
                        "Java"
                    ],
                    default: "Golang"
                }, {
                    name: "projectName",
                    type: "input",
                    message: "What is the project name:",
                    //filter: (answer) => to.slug(answer),
                    default: path.basename(this.destinationPath()),
                },
                {
                    name: "framework",
                    type: "list",
                    message: "Which framework would you like to use?",
                    choices: [
                        "SAM",
                        "Serverless"
                    ],
                    default: "SAM"
                },

            ]).then((answers) => {
                this.language = answers.language.toLowerCase();
                this.projectName = answers.projectName;
                this.framework = answers.framework;
            });
        },
    },

    writing: {
        build() {
            this.composeWith(`sls:a${this.language}`, {options: {props: this}});
        }
    },
    scripts() {

        this.fs.copyTpl(
            this.templatePath("./../../app/templates/scripts"),
            this.destinationPath("scripts"), {
                projectName: this.projectName
            }
        );

        this.fs.copy(
            this.templatePath("./../../app/templates/linux"),
            this.destinationPath("scripts/linux"));

        this.fs.copy(
            this.templatePath("./../../../common/configs"),
            this.destinationPath("configs"));

    },

    end() {
        //this.spawnCommand("serverless", ["plugin", "install", "--name", "serverless-sam"]);
        //this.spawnCommand("serverless", ["sam", "export", " --output", "template.yml"]);

        this.log(
            yosay(`Your ${this.language} project has been successfully set up, Happy Coding!!`)
        );
    },
});

module.exports = serverGenerator;
