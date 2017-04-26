// 欢迎页面，如果地址有误显示该页面
angular
  .module('userCenter.entp')
  .component('entpWelcome', {
    template: require('./entp.welcome.temp.html')
  })
