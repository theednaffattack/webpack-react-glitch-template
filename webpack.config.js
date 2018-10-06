const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const Exercise = require("./server/models/Exercise");

module.exports = {
  entry: "./client/src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
    }
    ]
  },
  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/src/index.html"
    })
  ]
};
