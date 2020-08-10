const HtmlWebpackPlugin = require("html-webpack-plugin");
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
        footerNotes: [
          "font: <a target=\"_blank\" href=\"https://sourcefoundry.org/hack/\">hack</a>",
          "html syntax style based on <a target=\"_blank\" href=\"https://github.com/Binaryify/OneDark-Pro\">one dark pro</a>'s color palette",
          "hosted by <a target=\"_blank\" href=\"https://www.umbler.com/br/seja-bem-vindo?a=7kly6v4e\">umbler</a>",
          "2011+, released under the <a target=\"_blank\" href=\"https://mit-license.org/\">mit license</a>.",
          "<a target=\"_blank\" href=\"https://github.com/vkiss/root\">source code</a>",
        ]
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
    new CleanWebpackPlugin()
  ],
  devServer: {
    contentBase: './dist',
    open: true
  },
};