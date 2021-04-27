const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

const filename = ext => isDevelopment ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader
        },

        'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}

const plugins = () => {
    const base = [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
            chunkFilename: filename('css')
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'src'), to: path.resolve(__dirname, 'dist')}
            ]
        }),
        new VueLoaderPlugin()
    ]

    if (isProduction) {
        base.push(new BundleAnalyzerPlugin())
    }

    return base
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
    mode: "development",
    entry: ['@babel/polyfill', './main.js'],
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ["*", ".js", ".vue", ".json"]
    },
    devServer: {
        contentBase: './dist',
    },
    devtool: isDevelopment ? 'source-map' : false,
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: cssLoaders()
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
        ]
    }
}