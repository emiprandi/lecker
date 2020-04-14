const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = (env, argv) => {
  return {
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.svg$/,
          use: 'vue-svg-loader'
        },
        {
          test: /\.png$/,
          use: {
            loader: 'file-loader',
            options: {
              esModule: false,
            }
          }
        }
      ]
    },
    resolve: {
      alias: {
        env: path.resolve(__dirname, 'config', `${argv.mode}.js`)
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: false,
        favicon: "./src/assets/favicon.png"
      }),
      new VueLoaderPlugin()
    ]
  };
};
