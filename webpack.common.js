const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
	entry: {
		app: './src/index.js'
		// another: './src/scripts/modules/another-module.js' // this is how you add extra modules
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
             },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                //include: ,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/,
				use: [ 'file-loader' ]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [ 'file-loader' ]
			}
		]
	},
	plugins: [
		// In general it's good practice to clean the /dist folder before each build,
		// so that only used files will be generated
		new CleanWebpackPlugin([ 'dist' ]),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: devMode ? '[name].css' : '[name].[hash].css',
			chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
		}),
		// it will replace our index.html file with a newly generated one
		new HtmlWebpackPlugin({
			title: 'Output Management',
			template: './src/index.html'
		}),
		// Enabling Hot Module Replacement
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	output: {
    filename: devMode ? '[name].js' : '[name].[hash].js',
		path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		// prevent to duplicate dependencies
		splitChunks: {
			chunks: 'all'
		}
	}
};