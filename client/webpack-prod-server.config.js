const path = require('path');
const webpack = require('webpack');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  entry: [path.join(__dirname, '/src/app/main.js')],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../server/src/build'),
    filename: 'main.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new TransferWebpackPlugin([
      { from: 'www' },
    ], path.resolve(__dirname, 'src')),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },
};

module.exports = config;
