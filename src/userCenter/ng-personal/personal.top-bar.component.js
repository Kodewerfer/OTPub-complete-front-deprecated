angular
  .module('userCenter.personal')
  .component('personalTopBar', {
    template: require('./personal.top-bar.temp.html'),
    controller: ['userService', function (userSrv) {
      var that = this
      this.userInfo = {}

      var ajaxSuccess = function (res) {
        var res = res.data
        that.userInfo = res.data
      }
      var ajaxError = function () { }
      userSrv.getUserInfos().then(ajaxSuccess, ajaxError)
    }]
  })
