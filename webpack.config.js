const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const baseCssUse = [
  'css-loader',
  'postcss-loader'
]

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'umd',
    library: 'RouterWaiter',
    umdNamedDefine: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsPlugin(),
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
        use: baseCssUse
      },
      {
        test: /\.less$/,
        use: [...baseCssUse, 'less-loader']
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
        parallel: true,
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true,
            pure_funcs: ['console.log']
          },
          output: {
            comments: false
          }
        }
      }),
    ],
  },
  target: 'node',
  externals: [nodeExternals()],
}
