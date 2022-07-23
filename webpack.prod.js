/* eslint-disable indent */
const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const common = require('./webpack.common')
const {merge} = require('webpack-merge')
module.exports = merge(common,{
    mode: 'production',
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        },
        {
            test: /\.scss$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
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
    externals: {
        react: 'React',
        axios: 'axios',
        'react-dom': 'ReactDOM',
        'react-router-dom': 'ReactRouterDOM',


    },
    plugins: [
        new DefinePlugin({
            'process.env.API_URL': JSON.stringify('http://fordevs.herokuapp.com/api/')
        }),
        new HtmlWebpackPlugin({
            template: './template.prod.html'
        }),
        new MiniCssExtractPlugin({
            // Add hash so browser do not cache our application
            filename: 'main-bundle-[fullhash].css'
        }),
        new FaviconsWebpackPlugin(
            {
                logo: './public/favicon.png'
            }
        )
    ]

})
