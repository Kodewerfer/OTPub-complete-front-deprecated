// 欢迎页面，如果地址有误显示该页面
angular
  .module('userCenter.provider')
  .component('providerWelcome', {
    template: require('./provider.welcome.temp.html')
  })
