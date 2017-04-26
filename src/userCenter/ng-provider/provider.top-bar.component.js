angular
  .module('userCenter.provider')
  .component('providerTopBar', {
    template: require('./provider.top-bar.temp.html'),
    controller: ['providerInfoService', function (proInfSrv) {
      var that = this
      this.userInfo = {}

      var ajaxSuccess = function (res) {
        res = res.data
        that.userInfo = res.data
      }
      var ajaxError = function () { }
      proInfSrv.getUserInfos().then(ajaxSuccess, ajaxError)
    }]
  })
