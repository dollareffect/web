const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    entry: path.resolve(__dirname, 'src/frontend/public/js/') + '/main.js',
    path.resolve(__dirname, 'src/frontend/scss') + '/main.scss',
  ],
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
    publicPath: "/docs/",
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
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};