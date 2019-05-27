"use strict";

const pathhelper = {
    basename(path) {
        return path.replace(/.*\//, "");
    },
    dirname(path) {
        return path.match(/.*\//);
    }
};

module.exports = pathhelper;