'use strict';

const path = require('path');
const yosay = require('yosay');
const to = require('to-case');
const generators = require('yeoman-generator');

/**
 * Our main generator
 */
const serverGenerator = generators.Base.extend({
    prompting: {
        welcome() {
            this.log(yosay(
                'Hello there, let\'s create a serverless architecture together!'
            ));
        },

        ask() {
            return this.prompt([
                {
                    name: 'language',
                    type: 'list',
                    message: 'What is the runtime language?',
                    choices: [
                        'Golang',
                        'NodeJS',
                        'DotNet',
                        'Python',
                        'Java'
                    ],
                    default: 'Golang'
                }, {
                    name: 'projectName',
                    type: 'input',
                    message: 'What is the project name:',
                    filter: answer => to.slug(answer),
                    default: path.basename(this.destinationPath()),
                }, {
                    name: 'projectOwner',
                    type: 'input',
                    message: 'What is the git project owner (owner/repository):',
                    filter: answer => to.slug(answer)
                }, {
                    name: 'projectDescription',
                    type: 'input',
                    message: 'Enter the project description:',
                }, {
                    name: 'projectVersion',
                    type: 'input',
                    message: 'Version:',
                    default: '0.1.0',
                }, {
                    name: 'authorName',
                    type: 'input',
                    message: 'Author name:',
                    store: true,
                }, {
                    name: 'authorEmail',
                    type: 'input',
                    message: 'Author email: ',
                    store: true,
                },
            ]).then((answers) => {
                this.language = answers.language.toLowerCase();
                this.projectName = answers.projectName;
                this.projectOwner = answers.projectOwner;
                this.projectDescription = answers.projectDescription;
                this.projectVersion = answers.projectVersion;
                this.authorName = answers.authorName;
                this.authorEmail = answers.authorEmail;
            });
        },
    },

    writing: {

        git() {

            this.log(this.templatePath(`${this.language}/gitattributes`))

            //todo: change gitattributes!
            this.fs.copy(
                this.templatePath(`${this.language}/gitattributes`),
                this.destinationPath('.gitattributes')
            );
            this.fs.copy(
                this.templatePath(`${this.language}/gitignore`),
                this.destinationPath('.gitignore')
            );
        },

        readMe() {
            this.fs.copyTpl(
                this.templatePath(`${this.language}/README.md`),
                this.destinationPath('README.md'), {
                    projectName: this.projectName,
                    projectDescription: this.projectDescription,
                }
            );
        },

        packageJSON() {
            this.fs.copyTpl(
                this.templatePath(`${this.language}/package.json`),
                this.destinationPath('package.json'), {
                    projectName: this.projectName,
                    projectDescription: this.projectDescription,
                    projectVersion: this.projectVersion,
                    authorName: this.authorName,
                    authorEmail: this.authorEmail,
                }
            );
        },
        serverlessYaml() {
            this.fs.copyTpl(
                this.templatePath(`${this.language}/serverless.yml`),
                this.destinationPath('serverless.yml'), {
                    projectName: this.projectName,
                }
            );
        },
        makeFile() {
            this.fs.copyTpl(
                this.templatePath(`${this.language}/Makefile`),
                this.destinationPath('Makefile'), {}
            )
        },
        build() {
            this.log("SSSSSSS "+ this.language);

            switch (this.language) {
                case "golang":
                    this.fs.copy(
                        this.templatePath(`${this.language}/gomod.sh`),
                        this.destinationPath('gomod.sh')
                    );
                    break;
                case "dotnet":

                    this.fs.copy(
                        this.templatePath(`${this.language}/aws-csharp.csproj`),
                        this.destinationPath('aws-csharp.csproj')
                    );

                    this.fs.copy(
                        this.templatePath(`${this.language}/build.sh`),
                        this.destinationPath('build.sh')
                    );

                    this.fs.copy(
                        this.templatePath(`${this.language}/build.cmd`),
                        this.destinationPath('build.cmd')
                    );

                    break;

            }
        },

        //   dotbox() {
        // this.fs.copyTpl(
        //   this.templatePath('dotbox.json'),
        //   this.destinationPath('.dotbox.json'), {
        //     projectName: this.projectName,
        //     projectOwner: this.projectOwner,
        //   }
        // );

        config() {
            this.fs.copy(
                this.templatePath(`${this.language}/config.json`),
                this.destinationPath('config.json')
            );

            this.fs.copy(
                this.templatePath(`${this.language}/slsattributes.json`),
                this.destinationPath('slsattributes.json')
            );

        },
        vscode() {
            this.fs.copy(
                this.templatePath(`./../../app/templates/${this.language}/launch.json`),
                this.destinationPath('.vscode/launch.json')
            )
        },

    },
    scripts() {
        this.fs.copy(
            this.templatePath(`./../../app/templates/scripts`),
            this.destinationPath('scripts')
        )
    },
    install() {
        this.composeWith('sls:route', {options: {__app: true, language: this.language}});
        this.npmInstall();
    },

    end() {
        //this.spawnCommand("sls", ['plugin', 'install', '--name', 'serverless-sam']);
        //this.spawnCommand('sls', ['sam', 'export', ' --output', 'template.yml']);

        this.log(
            yosay(`Your ${this.language} project has been successfully set up, Happy Coding!!`)
        );
    },
});

module.exports = serverGenerator;
