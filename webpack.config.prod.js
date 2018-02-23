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
      },
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
      from: path.resolve(__dirname, 'src/frontend/public/img/')
    }]),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
  ],
  devtool: 'inline-source-map'
};