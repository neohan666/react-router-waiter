const path = require('path')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    index: './src/index',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    library: {
      type: 'commonjs-static',
    },
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset/resource'
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
