'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./../webpack.config.js');
const open = require('open');
const port = 8888;
const contentBase = './example/';


new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    contentBase: contentBase,
    hot: true,
    historyApiFallback: true,
    inline:true
})
    .listen(port, 'localhost', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Listening at localhost:' + port);
        console.log('Opening your system browser...');
        open('http://localhost:' + port + '/webpack-dev-server/');
    });