const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader'
          },
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inlineSource: 'main.bundle.js',
      title: "Vinicius Kiss - Desenvolvedor Frontend",
      templateParameters: {
        email: "contato@vkiss.com.br",
        telefone: "(11) 985 750 139",
        telefoneLink: "whatsapp://send?phone=5511985750139",
        footerLinks: [
          {
            label: "linkedin",
            href: "https://www.linkedin.com/in/vkiss/",
            target: "_blank",
          },
          {
            label: "github",
            href: "https://github.com/vkiss",
            target: "_blank",
          },
          {
            label: "stackoverflow",
            href: "https://stackoverflow.com/story/vinik",
            target: "_blank",
          },
          {
            label: "picpay",
            href: "https://app.picpay.com/user/vkiss",
            target: "_blank",
          }
        ],
      },
      meta: {
        viewport: 'width=device-width,minimum-scale=1',
        description: 'Escrevo códigos para deixar sites bonitos.',
        robots: 'index, follow'
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
    }),
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version)
    }),
  ],
  devServer: {
    contentBase: './dist',
    open: true
  },
};