// 引入等比适配插件
const px2rem = require('postcss-px2rem')

// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 16
})
module.exports = {

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  },
  lintOnSave: false,

  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY
        return args
      })
  },

  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }


  },

  productionSourceMap: false,

  publicPath: process.env.NODE_ENV === 'production' ? '' : './',

  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080, // CHANGE YOUR PORT HERE!
    https: true,
    hotOnly: false,
    // 1.解决跨域 配置服务----------------------------------------------------------------------------------
    // devServer: {
    //   open: true, //是否自动弹出浏览器页面
    //   https: false, //是否使用https协议
    //   hotOnly: true, //是否开启热更新
    //   proxy: {  //配置跨域
    //     '/api': {
    //       target: url,
    //       changOrigin: true,  //允许跨域
    //       pathRewrite: {
    //         '^/api': ''
    //       }
    //     },
    //   }
    // },
  },
};
