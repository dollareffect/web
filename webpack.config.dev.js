const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const globImporter = require('node-sass-glob-importer');

const ETP = new ExtractTextPlugin({
  filename: 'css/main.css',
  allChunks: true,
});

module.exports = {
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, 'src/frontend/public/js/') + '/main.js',
    path.resolve(__dirname, 'src/frontend/scss') + '/main.scss',
  ],
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
                plugins: [autoprefixer()]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                importer: globImporter()
              }
            }
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: "docs/",
    publicPath: "docs/",
    port: 9000,
    hot: true,
    inline: true,
    watchContentBase: true,
    watchOptions: {
      ignored: /(node_modules|bower_components)/
    }
  },
  devtool: 'inline-source-map',
  plugins: [
    ETP,
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/frontend/public/img/'),
      to: "img/"
    }]),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};