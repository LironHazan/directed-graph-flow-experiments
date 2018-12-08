const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map', // any "source-map"-like devtool is possible
	devServer: {
    // suggested official config:
		// contentBase: './dist',
    // hot: true

    // hot reloading html on save - fix / hack:
    // https://github.com/webpack/webpack-dev-server/issues/1271
    contentBase:  './src/',
    watchContentBase: true,
    hot: true,
	}
});