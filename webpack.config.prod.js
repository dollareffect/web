const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src/frontend/app') + '/index.js',
  output: {
    path: path.resolve(__dirname, '__bundle__'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'stage-2']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
              outputPath: path.resolve(__dirname, '__bundle__/css/'),
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')],
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: "src/frontend/public",
    publicPath: "/__bundle__/",
    port: 9000,
    hot: true,
    inline: true,
    watchContentBase: true,
    watchOptions: {
      ignored: /(node_modules|bower_components)/
    }
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/frontend/public/img/'),
      to: "img/"
    }]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        imageminMozjpeg({
          quality: 80,
          progressive: true
        })
      ]
    })
  ],
  devtool: 'inline-source-map'
};