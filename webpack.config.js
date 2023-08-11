var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');
var webpack = require('webpack');

module.exports = {
    mode: 'none',
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : false,
    entry: `${SRC_DIR}/index.tsx`,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
    output: {
        filename: 'bundle.js',
        path: DIST_DIR,
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: SRC_DIR,
                use: 'babel-loader',
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
            {
                test: /\.scss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                include: DIST_DIR,
                use: 'file-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
};
