//@ts-check
'use-strict';

const path = require('path');
const webpack = require('webpack');
const axios = require('axios').default;
const fs = require('fs');

const configGet = () => {
	/**
	 * @type {webpack.Configuration}
	 */
	const config = {
		target: 'node', // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/

		entry: './src/extension.ts', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
		output: {
			// the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
			path: path.resolve(__dirname, 'dist'),
			filename: 'extension.js',
			libraryTarget: 'commonjs2',
			devtoolModuleFilenameTemplate: '../[resource-path]',
		},
		devtool: 'source-map',
		externals: {
			vscode: 'commonjs vscode', // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
		},
		resolve: {
			// support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
			extensions: ['.ts', '.js', '.json'],
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'ts-loader',
						},
					],
				},
			],
		},
	};

	axios
		.get(
			'https://raw.githubusercontent.com/jamesinaxx/jamesinaxx/public/affirmations.json'
		)
		.then(affirmations =>
			fs.writeFileSync('./src/lib/affirmations.json', affirmations.data)
		)
		.catch(error =>
			console.log(
				'Failed to download affirmations, using built in ones: ' + error
			)
		);

	return config;
};

module.exports = configGet;
