const path = require("path");
const copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    token: "./src/processes/tokenCount.js",
    punct: "./src/processes/textProcessing.js",
    search: "./src/processes/googleSearch.js",
    acronym: "./src/processes/acronyms.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  watch: true,
  plugins: [
    new copyWebpackPlugin({
      patterns: [{ from: "Popup" }],
    }),
  ],
};
