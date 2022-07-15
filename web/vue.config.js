const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  //开启代理服务器
  devServer: {
    port: 8088,
    proxy: 'http://127.0.0.1:7001'
  },
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = "Lin Feng's Blog";
        return args;
      });
  }

})
