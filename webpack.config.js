const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  entry: {
    index: "./app/src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "app/dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/",
              publicPath: "assets/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./app/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "app/src/components/navbar/navbar.html",
          to: "src/components/navbar/navbar.html",
        },
        {
          from: "app/src/components/card/card.js",
          to: "src/components/card/card.js",
        },
        {
          from: "app/src/views/home.html",
          to: "src/views/home.html",
        },
        {
          from: "app/src/views/favorites.html",
          to: "src/views/favorites.html",
        },
        { from: "app/src/assets", to: "assets" },
        {
          from: "app/src/lib/angular-loader/angular-loader.js",
          to: "lib/angular-loader/angular-loader.js",
        },
        {
          from: "node_modules/angular/angular.min.js",
          to: "lib/angular.min.js",
        },
        {
          from: "node_modules/angular-route/angular-route.min.js",
          to: "lib/angular-route.min.js",
        },
        {
          from: "node_modules/angular-mocks/angular-mocks.js",
          to: "lib/angular-mocks.js",
        },
      ],
    }),
    new webpack.DefinePlugin({
      "process.env": {
        UNSPLASH_API_KEY: JSON.stringify(process.env.UNSPLASH_API_KEY),
      },
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "app/dist"),
    },
    compress: true,
    port: 8080,
  },
};
