const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const SETTING = {
  PORT: 8000,
  DEBUG: {
    devtool: "cheap-module-source-map",
  },
  PATH: {
    src: "src",
    icon: "favicon.ico",
    assets: "assets",
    dist: "dist",
    script: "script",
    css: "css",
  },
  FILE: {
    scriptmain: "src/index.tsx",
    htmlfile: "index.html",
    style: "style.css",
    script: "script.min.js",
  },
};

function jsonPath(...args) {
  let strpath = "";
  for (let index = 0; index < args.length; index++) {
    const element = args[index];
    strpath += (strpath ? "/" : "") + element;
  }
  return strpath;
}

module.exports = (env) => {
  return {
    entry: path.resolve(__dirname, SETTING.FILE.scriptmain),
    output: {
      path: env["path"]
        ? path.resolve(env["path"])
        : path.resolve(__dirname, SETTING.PATH.dist),
      filename: jsonPath(SETTING.PATH.script, SETTING.FILE.script),
      clean: true,
    },
    devtool: SETTING.DEBUG.devtool,
    devServer: {
      contentBase: path.join(__dirname, SETTING.PATH.src),
      // compress: true,
      // open: true,
      // host: '0.0.0.0',
      compress: true,
      disableHostCheck: true, // That solved it
      port: SETTING.PORT,
    },
    stats: {
      children: true,
    },
    module: {
      rules: [
        {
          test: /\.(s(a|c)ss)$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        // {
        //   test: /\.(s(a|c)ss)$/,
        //   loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        //  },
        {
          test: /\.worker\.(c|m)?js$/i,
          use: [
            {
              loader: "worker-loader",
            },
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
              },
            },
          ],
        },
        {
          test: /\.d.ts$/i,
          use: [
            {
              loader: "raw-loader",
              options: {
                esModule: false,
              },
            },
          ],
        },
        {
          test: /\.(js|ts|tsx)?$/,
          exclude: [
            /node_modules/
          ],
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-typescript",
                "@babel/preset-react",
              ]
            },
          },
        },
        {
          test: /\.wasm$/,
          type: "javascript/auto",
          loader: "file-loader",
          options: {
            publicPath: "./wasm/",
            outputPath: "wasm/",
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: jsonPath(SETTING.PATH.css, SETTING.FILE.style),
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, SETTING.PATH.src, SETTING.FILE.htmlfile),
      }),
      new CopyPlugin({
        patterns: [
          //   { from: path.join(__dirname, SETTING.PATH.src, SETTING.PATH.assets), to: SETTING.PATH.assets },
          { from: path.join(__dirname, SETTING.PATH.icon) },
        ],
      }),
      new Dotenv()
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json", ".wasm"],
      fallback: {
        fs: false,
        child_process: false,
        path: false,
        crypto: false,
      },
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, 'paths.json'),
        }),
      ]
    },
  };
};
