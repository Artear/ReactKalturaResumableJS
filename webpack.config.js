var path = require('path');

process.env.REACT_WEBPACK_ENV = 'development';

module.exports = {
    entry: './example/index.js',
    output: {
        path: path.resolve(__dirname, './example/build'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015','stage-0']
                }
            }
        ]
    }
};