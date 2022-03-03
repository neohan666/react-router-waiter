const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
    library: {
      type: 'commonjs-static',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        options: {
          cacheDirectory: true
        },
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: ['css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        options: {
          esModule: false,
          limit: 4096,
        },
        loader: 'url-loader',
      },
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            pure_funcs: ['console.log']
          }
        }
      }),
    ],
  },
  externalsPresets: { node: true },
  externals: [
    nodeExternals({
      allowlist: []
    })
  ],
}
