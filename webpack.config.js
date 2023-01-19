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
				exclude: [/node_modules/],
				use: [
					{
						loader: 'ts-loader',
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
		fallback: {
			fs: false,
			net: false,
			crypto: require.resolve('crypto-browserify'),
			stream: require.resolve('readable-stream'),
		},
	},
	plugins: [
		new webpack.ProvidePlugin({
			Buffer: ['buffer', 'Buffer'],
		}),
		new webpack.ProvidePlugin({
			process: 'process/browser',
		}),
	],
};
