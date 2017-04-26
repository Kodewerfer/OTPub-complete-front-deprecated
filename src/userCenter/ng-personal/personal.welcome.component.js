// 欢迎页面，如果地址有误显示该页面
angular
  .module('userCenter.personal')
  .component('personalWelcome', {
    template: require('./personal.welcome.temp.html'),
    controller: function () {
    }
  })
