//新建代理对象
let proxyObj = {};

//所有需要代理的路径
proxyObj['/'] = {
  //websocket
  ws: false,
  //目标地址
  target: 'http://localhost:8081',
  //发送请求头host会被设置target（目标地址）
  changeOrigin: true,
  //不重写请求地址
  pathReWrite: {
    '^/': '/'
  }
}

module.exports = {
  configureWebpack: {
    resolve: {
      // 文件夹别名
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'network': '@/network',
        'utils': '@/utils'
      }
    }
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: proxyObj
  }
}