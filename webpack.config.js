'use strict';

const path = require('path');

let env = 'dev';
process.env.REACT_WEBPACK_ENV = 'development';

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv The wanted environment
 * @return {Object} Webpack config
 */
function buildConfig(wantedEnv) {
    return require(path.join(__dirname, 'cfg/' + wantedEnv));
}

module.exports = buildConfig(env);