const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV == 'production';
const stylesHandler = isProd ? MiniCssExtractPlugin.loader : 'style-loader';

console.log(`:::::::::::::::::::::::::::::::::::
::: Building in ${process.env.NODE_ENV} mode :::
:::::::::::::::::::::::::::::::::::\n`);

module.exports = {
  entry: {
    index: './src/main/main.js',
    'pets/pets': './src/pets/pets.js'
  },

  output: {
    filename: '[name]-[hash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  ...(isProd && { devtool: 'eval-source-map' }),

  devServer: {
    watchFiles: './src'
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/main/main.html',
      inject: 'body',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './src/pets/pets.html',
      filename: 'pets/pets.html',
      inject: 'body',
      chunks: ['pets/pets']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].'
    }),
    // new CopyPlugin({
    //   patterns: [{ from: './src/assets', to: path.resolve(__dirname, 'dist/assets') }]
    // })
  ],

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader']
      },
      {
        test: /\.scss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader']
      }
    ]
  }
};
