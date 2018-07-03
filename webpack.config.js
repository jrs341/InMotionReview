const path = require('path')
module.exports = {
  mode: 'development',
  entry: './app/app.js',
  output: {
    filename: 'public/bundle.js'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      components: path.resolve(__dirname, 'app/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }
    ]
  }
}
