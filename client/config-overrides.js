const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {override, fixBabelImports, addWebpackModuleRule, addWebpackPlugin} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: true
  }),
  addWebpackModuleRule({
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'less-loader'
      }
    ]
  }),
  addWebpackModuleRule({
    test: /\.(scss|sass)$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      'css-loader',
      'sass-loader'
    ]
  }),
  addWebpackPlugin(new MiniCssExtractPlugin({
    filename: 'hello.css'
  }))
)