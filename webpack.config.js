const webpack = require('webpack');

module.exports = {
	mode: 'production',
	resolve: {
		extensions: ['.ts', '.js'],
	},
	output: {
		path: __dirname + '/dist',
		filename: 'chainlink_plugin.min.js',
		library: 'ChainlinkPlugin',
		libraryExport: 'default',
		libraryTarget: 'umd',
		globalObject: 'this',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: [/node_modules/, '/test/'],
				use: [
					{
						loader: 'ts-loader',
					},
				],
			},
		],
	},
};
