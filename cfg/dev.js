var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        path.join(__dirname, '../example/src/index')
    ],
    output: {
        path: path.join(__dirname, '../example/build'),
        filename: 'bundle.js',
        publicPath: 'static'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            exclude: /node_modules/
        }]
    }
};