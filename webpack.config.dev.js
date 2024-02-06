const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const deps = require("./package.json").dependencies;
// const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { ModuleFederationPlugin } = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "./build"),
    port: 9000,
    open: true,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    hot: true,
    compress: true,
  },

  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "build"),
    // publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
      template: path.resolve(__dirname, "public", "index.html"),
      favicon: "./public/favicon.ico",
    }),
    new ModuleFederationPlugin({
      name: "aertrip",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {},
      shared: {
        //  ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        "react-redux": {
          singleton: true,
          requiredVersion: deps["react-redux"],
        },
      },
    }),
    new ExternalTemplateRemotesPlugin(),

    new CleanWebpackPlugin(),
    new NodePolyfillPlugin(),
    new LodashModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.css$/i,
        use: {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: ["postcss-nested"],
            },
          },
        },
      },
      {
        test: /\.(xml|config)$/,
        use: ["xml-loader"],
        resourceQuery: { not: [/url/] },
      },
      { test: /\.txt$/, use: "raw-loader" },
      {
        test: /\.(jpg|jpeg|gif|ico|png|config)$/,

        use: [
          {
            loader: "file-loader",
          },

          {
            loader: "image-webpack-loader",
          },
        ],
      },
      {
        test: /\.(js|jsx|)$/,
      },

      {
        test: /\.svg$/i,
        type: "asset",
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: ["@svgr/webpack"],
      },

      {
        test: /\.(js|jsx|)$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  debug: true, // Output the targets/plugins used when compiling

                  // Configure how @babel/preset-env handles polyfills from core-js.
                  // https://babeljs.io/docs/en/babel-preset-env
                  useBuiltIns: "usage",

                  // Specify the core-js version. Must match the version in package.json
                  corejs: 3,

                  // Specify which environments we support/target for our project.
                  // (We have chosen to specify targets in .browserslistrc, so there
                  // is no need to do it here.)
                  // targets: "",
                },
              ],

              "@babel/preset-react",
            ],
          },
        },
      },
      // {
      //   test: /\.json$/,
      //   loader: 'babel-loader'
      // }
    ],
  },
};
