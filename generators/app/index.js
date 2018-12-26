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
                //     {
                //     name: 'language',
                //     type: 'input',
                //     message: 'What is the runtime language?',
                //     choices: [
                //         'Go1.x',
                //         'NodeJs',
                //     ],
                //     default: 'Go1.x'
                // },
                {
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
                //this.language = answers.language;
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
            //todo: change gitattributes!
            this.fs.copy(
                this.templatePath('gitattributes'),
                this.destinationPath('.gitattributes')
            );
            this.fs.copy(
                this.templatePath('gitignore'),
                this.destinationPath('.gitignore')
            );
        },

        readMe() {
            this.fs.copyTpl(
                this.templatePath('README.md'),
                this.destinationPath('README.md'), {
                    projectName: this.projectName,
                    projectDescription: this.projectDescription,
                }
            );
        },

        packageJSON() {
            this.fs.copyTpl(
                this.templatePath('package.json'),
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
                this.templatePath('serverless.yml'),
                this.destinationPath('serverless.yml'), {
                    projectName: this.projectName,
                }
            );
        },
        makeFile() {
            this.fs.copyTpl(
                this.templatePath('Makefile'),
                this.destinationPath('Makefile'), {}
            )
        },
        gomod() {
            this.fs.copyTpl(
                this.templatePath('gomod.sh'),
                this.destinationPath('gomod.sh')
            )
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
                this.templatePath('config.json'),
                this.destinationPath('config.json')
            );
        },
        vscode() {
            this.fs.copy(
                this.templatePath('./../../app/templates/launch.json'),
                this.destinationPath('.vscode/launch.json')
            )
        },

    },
    scripts() {
        this.fs.copy(
            this.templatePath('./../../app/templates/scripts'),
            this.destinationPath('scripts')
        )
    },
    install() {
        this.composeWith('sls:route', {options: {__app: true}});
        this.npmInstall();
    },

    end() {
        //this.spawnCommand("sls", ['plugin', 'install', '--name', 'serverless-sam']);
        //this.spawnCommand('sls', ['sam', 'export', ' --output', 'template.yml']);

        this.log(
            yosay('Your project has been set up! \n Thanks and see you soon!')
        );
    },
});

module.exports = serverGenerator;
