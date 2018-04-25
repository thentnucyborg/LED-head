const path = require('path');
const webpack = require('webpack');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  entry: './src/app/main.js',
  devServer: {
    contentBase: 'src/www',
    hot: true,
    inline: true,
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    proxy:{
      '/api': {
        'target': 'http://localhost:8080',
        'secure': false,
        'logLevel': 'debug'
      }
    }
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new TransferWebpackPlugin([
      { from: 'www' },
    ], path.resolve(__dirname, 'src')),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: ['react-hot-loader/webpack', 'babel-loader'],
        include: path.join(__dirname, 'src'),
      }, {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
};

module.exports = config;
