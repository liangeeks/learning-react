var _      		= require("lodash");
var path        = require("path");
var webpack     = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var port   		= 8088;

const JS_LOADER = {
	test: /\.jsx?$/,
	loader: 'babel',
	exclude: /node_modules/,
	query: {
		presets: ['es2015', 'react', 'stage-0', 'stage-1', 'stage-2', 'stage-3']
	}
};

var config = {
	context: __dirname,
	entry: {
		app: [
			"./src/app.js"
		]
	},

	resolve: {
		extensions: ['', '.js', '.jsx']
	},

	module: {
		loaders: [
			JS_LOADER,
			{test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css'),},
			{test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]-[local]_[hash:base64:2]!sass?sourceMap')},
			{test: /\.txt$/, loader: 'raw-loader'},
			{test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/, loader: 'url-loader'},
			{test: /\.(eot|ttf|wav|mp3)$/, loader: 'file-loader'}
		]
	},
	//devtool: "#inline-source-map",
	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: "/build/",
		filename: "[name].js"
	},
	plugins: [
		// 有错误时停止生成文件
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('[name].css')
		//new webpack.optimize.UglifyJsPlugin()
	]
};

config.devtool   = "eval";
config.devServer = {
	hot: true,
	debug: true,
	progress: true,
	profile: true,
	colors: true,
	port: port
};

_.keys(config.entry).forEach(function (key) {
	config.entry[key].unshift(
		'webpack-dev-server/client?http://localhost:' + port,
		"webpack/hot/dev-server"
	);
});

module.exports = config;


