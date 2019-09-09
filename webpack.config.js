const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const webpack = require('webpack');

module.exports = { 
    entry: {
        main: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            'babel-polyfill', 
            './src/index.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'assets/js/bundle.js'
    },
    devServer: {
        contentBase: "./public",
        historyApiFallback: true, 
        inline: true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/react'],
                        plugins: ['react-hot-loader/babel', '@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ]
    }
};