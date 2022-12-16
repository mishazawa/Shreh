const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      { test: /\.glb$/,                  use: 'raw-loader' },
      { test: /(\.glsl|\.frag|\.vert)$/, use: 'raw-loader' },
      { test: /(\.jpg|\.png|\.tga)$/,    use: 'raw-loader' },

      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          path.resolve(__dirname, './utils/'),
          path.resolve(__dirname,'./node_modules/'),
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
     new HtmlWebpackPlugin({
       title: 'Shreh',
     }),
     new webpack.IgnorePlugin({ resourceRegExp: /^\.\/utils$/, }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      core: path.resolve(__dirname, './src/core/'),
      assets: path.resolve(__dirname, './src/assets/'),
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  optimization: {
    runtimeChunk: 'single',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].[chunkhash].js',
    clean: true,
  },
};
