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
        build() {
            this.composeWith(`sls:a${this.language}`, {options: {props: this}});
        }
    },
    scripts() {
        this.fs.copy(
            this.templatePath(`./../../app/templates/scripts`),
            this.destinationPath('scripts')
        )
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
