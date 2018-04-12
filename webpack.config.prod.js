const path = require('path');
const webpack = require('webpack');
// const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ETP = new ExtractTextPlugin({
  filename: 'css/main.css',
  allChunks: true,
});

module.exports = {
  devtool: 'source-map',
  // entry: path.resolve(__dirname, 'src/frontend/app') + '/index.js',
  entry: path.resolve(__dirname, 'src/frontend/public/js/') + '/main.js',
  output: {
    path: path.resolve(__dirname, 'docs/'),
    filename: 'js/bundle.js'
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
        test: /\.(sass|scss)$/i,
        use: ETP.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { minimize: true }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [require('autoprefixer')()]
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    ETP,
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/frontend/public/index.html'),
      to: "index.html"
    }]),
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