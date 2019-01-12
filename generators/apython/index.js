'use strict';

const generators = require('yeoman-generator');

/**
 * Python generator
 */
const serverGenerator = generators.Base.extend({

    writing: {
        tobedone() {
            this.log("Not finished yet, It will be released soon!");
        }
    },

    install() {
        //this.composeWith('sls:route', {options: {__app: true, language: this.language}});
        //this.npmInstall();
    },


});

module.exports = serverGenerator;
