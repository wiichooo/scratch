require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");
const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');

module.exports = withLess(withCss({
  //cssModules: true,
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
        
      })
    ];

    return config;
  }
}));
