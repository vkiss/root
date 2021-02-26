const path = require( "path" );
const webpack = require( "webpack" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const HtmlWebpackInlineSourcePlugin = require( "html-webpack-inline-source-plugin" );
const CopyPlugin = require( "copy-webpack-plugin" );
const { CleanWebpackPlugin } = require( "clean-webpack-plugin" );

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve( __dirname, "dist" )
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader"
          },
        ],
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: "raw-loader"
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin( {
      inlineSource: "main.bundle.js",
      title: "Vinicius Kiss - Desenvolvedor Frontend",
      templateParameters: {
        email: "contato@vkiss.com.br",
        telefone: "(11) 985 750 139",
        telefoneLink: "https://api.whatsapp.com/send?phone=5511985750139",
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
            label: "picpay",
            href: "https://app.picpay.com/user/vkiss",
            target: "_blank",
          }
        ],
      },
      meta: {
        viewport: "width=device-width,minimum-scale=1",
        description: "Escrevo códigos que deixam sites bonitos.",
        robots: "index, follow"
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
    } ),
    new HtmlWebpackInlineSourcePlugin( HtmlWebpackPlugin ),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin( {
      VERSION: JSON.stringify( require( "./package.json" ).version ),
      UMBLERREF: JSON.stringify( "https://www.umbler.com/br/seja-bem-vindo?a=7kly6v4e" )
    } ),
    new CopyPlugin( {
      patterns: [
        { from: "./rootFiles", to: "./" },
      ],
    } ),
  ],
  devServer: {
    contentBase: "./dist",
    open: true
  },
};
