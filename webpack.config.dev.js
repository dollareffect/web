const path = require('path');
const webpack = require('webpack');

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
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};