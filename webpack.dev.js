/* eslint-disable indent */
const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const {merge} = require('webpack-merge')
module.exports =merge(common,{
    mode: 'development',
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        },
        {
            test: /\.scss$/,
            use: [{
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            },
            {
                loader: 'sass-loader'
            }

            ],
            exclude: /node_modules/
        }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        devMiddleware: {
            writeToDisk: true
        },
        static: {
            directory: './public'
        },
        historyApiFallback: true
    },
    plugins: [
        new DefinePlugin({
            'process.env.API_URL': JSON.stringify('http://fordevs.herokuapp.com/api/')
        }),
        new HtmlWebpackPlugin({
            template: './template.dev.html'
        })
    ]

})