const path = require('path')

const SRC_DIR = path.join(__dirname, '/client')
const DIST_DIR = path.join(__dirname, 'public')


module.exports = {

  mode: "development",

  entry: SRC_DIR + '/index.jsx',

  output: {
    path: DIST_DIR,
    filename: "bundle.js"
  },

  watch: true,


  module: {
    rules: [
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }


}