angular
  .module('userCenter.entp')
  .component('entpTopBar', {
    template: require('./entp.top-bar.temp.html'),
    controller: ['entpInfoService', function (EInSrv) {
      var that = this
      this.userInfo = {}

      var ajaxSuccess = function (res) {
        res = res.data
        that.userInfo = res.data
      }
      var ajaxError = function () { }
      EInSrv.getUserInfos().then(ajaxSuccess, ajaxError)
    }]
  })
