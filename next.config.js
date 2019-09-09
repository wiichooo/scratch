// const withCSS = require('@zeit/next-css')
// module.exports = withCSS({
//     webpack(config, options) {
//         return config
//       }
// })

// // ./next.config.js

require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");
//const withCSS = require('@zeit/next-css')

module.exports = {
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
};
