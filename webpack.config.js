const path = require('path');
const ExtractTestPlugin = require('extract-text-webpack-plugin');

const APP_PATH = path.join(__dirname, "public");

module.exports = (env) => {

	const isProduction = env === "production";
	const cssExtract = new ExtractTestPlugin('styles.css');

	return {
		entry: "./src/app.js",
		output: {
			path: APP_PATH,
			filename: "bundle.js",
			publicPath: '/'
		},
		module: {
			rules: [{
				loader: "babel-loader",
				test: /\.js$/,
				exclude: /node_modules/
			}, {
				test: /\.s?css$/,
				use: cssExtract.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						}, {
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}

					]
				})
			}]
		},
		plugins: [
			cssExtract
		],
		devtool: isProduction ? "source-map" : "inline-source-map",
		devServer: {
			contentBase: APP_PATH,
			historyApiFallback: true,
			publicPath: '/',
			port: 8080
		}
	};
}