const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'images/[name][ext]'
    },
    module: {
        rules: [{
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, "css-loader"],
            },
            {
                test: /\.s[ac]ss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    // options: {
                    //     publicPath: (resourcePath, context) => {
                    //         return path.relative(path.dirname(resourcePath), context);
                    //     } // ,
                    //     // sourceMap: true,
                    // }
                },
                    "css-loader",
                    'sass-loader'
                ],
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            }
        ]
    },

    devServer: {
        open: true,
        watchFiles: ['./src/sass/*', './src/pug/*'],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'style.css',}),
        new CopyWebpackPlugin({
            patterns: [
            {
                from: path.resolve(__dirname, './src/assets/img'),
                to: path.resolve(__dirname, 'dist/images')
            },
            {
                from: path.resolve(__dirname, './src/assets/favicon'),
                to: path.resolve(__dirname, 'dist/favicon')
            },
            {
                from: path.resolve(__dirname, './src/assets/products.json'),
                to: path.resolve(__dirname, 'dist/products.json')
            },
            {
                from: path.resolve(__dirname, './src/assets/enjoy.mp4'),
                to: path.resolve(__dirname, 'dist/enjoy.mp4')
            },
            {
                from: path.resolve(__dirname, './src/script.js'),
                to: path.resolve(__dirname, 'dist/script.js')
            }]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/pug/index.pug'),
            filename: 'index.html',
        })
    ],
};