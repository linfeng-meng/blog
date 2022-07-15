/* eslint valid-jsdoc: "off" */

'use strict';
const userConfig = require("./config.user");

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1648457421628_4096';

  // add your middleware config here
  config.middleware = ["errorHandler", "auth"];
  config.session = {
    key: "BLOG_EGG_SESSION_KEY",
    encrypt: false,
  };
  //csrf安全
  config.security = {
    csrf: {
      enable: false
    }
  }
  //文件
  config.multipart = {
    mode: "file",
    fileExtensions: [".md"]
  }

  config.mongoose = {
    url: 'mongodb://127.0.0.1/blog',
    options: {
      useUnifiedTopology: true
    },
    // mongoose global plugins, expected a function or an array of function and options
    // plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
  };


  config.multipart = {
    mode: 'stream',
  };


  config.jwt = {
    secret: userConfig.userName
  }
  config.auth = {
    whiteList: [userConfig.userName],
  };
  return {
    ...config,
    ...userConfig,
  };
};
