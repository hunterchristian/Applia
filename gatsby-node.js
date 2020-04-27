const lodash = require('lodash');
const CopyPkgJsonPlugin = require('copy-pkg-json-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const path = require('path');

function srcPaths(src) {
  return path.join(__dirname, src);
}

const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';

// #region Common settings
const commonConfig = {
  resolve: {
    alias: {
      '@': srcPaths('src'),
      '@public': srcPaths('electron-public'),
      '@main': srcPaths('src/main'),
      '@models': srcPaths('src/renderer/models'),
      '@renderer': srcPaths('src/renderer'),
      '@components': srcPaths('src/renderer/components'),
      '@decorators': srcPaths('src/decorators'),
    },
    extensions: ['.js', '.json', '.ts', '.tsx'],
  }
};
// #endregion

// const mainConfig = lodash.cloneDeep(commonConfig);
// mainConfig.entry = './src/main/main.ts';
// mainConfig.target = 'electron-main';
// mainConfig.output.filename = 'main.bundle.js';
// mainConfig.plugins = [
//   new CopyPkgJsonPlugin({
//     remove: ['scripts', 'devDependencies', 'build'],
//     replace: {
//       main: './main.bundle.js',
//       scripts: { start: 'electron ./main.bundle.js' },
//       postinstall: 'electron-builder install-app-deps',
//     },
//   }),
//   new WebpackShellPlugin({
//     onBuildEnd: ['cp src/main/preload.js dist/preload.js'],
//   }),
// ];

// const rendererConfig = lodash.cloneDeep(commonConfig);
// rendererConfig.entry = './src/pages/renderer.tsx';
// rendererConfig.target = 'electron-renderer';
// rendererConfig.output.filename = 'renderer.bundle.js';
// rendererConfig.plugins = [
//   new HtmlWebpackPlugin({
//     template: path.resolve(__dirname, './electron-public/index.html'),
//   }),
// ];

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig(commonConfig)
}