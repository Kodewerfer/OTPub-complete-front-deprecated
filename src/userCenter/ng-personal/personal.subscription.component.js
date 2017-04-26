angular
  .module('userCenter.personal')
  .component('personalSubscription', {
    template: require('./personal.subscription.temp.html'),
    controller: ['personalSubscriptionService', function (subSrv) {
      var that = this
      this.$onInit = function () {
        that.fetchData()
      }
      // the subscription infos
      this.subInfos = {}

      // ajax handling.
      this.ajaxErrorMesg = ''
      this.showErrorWindow = false
      this.showInfoRows = false
      var ajaxSuccess = function (res) {
        that.subInfos = res.data
        that.showInfoRows = true
      }

      var ajaxError = function (errorRes) {
        that.showErrorWindow = true
        that.ajaxErrorMesg = errorRes
      }

      this.fetchData = function () {
        subSrv.getSubList().then(ajaxSuccess, ajaxError)
      }
    }]
  })
