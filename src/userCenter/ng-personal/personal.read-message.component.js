angular
  .module('userCenter.personal')
  .component('personalReadMessage', {
    bindings: {
      'msgID': '<'
    },
    template: require('./personal.read-message.temp.html'),
    controller: ['personalMessagesService', function (msgSrv) {
      var that = this
      this.$onInit = function () {
        fetchData()
      }

      // the message list
      this.theMsg = {}

      // ajax handling.
      this.ajaxErrorMesg = ''
      this.showErrorWindow = false
      this.showNoData = false

      var ajaxSuccess = function (res) {
        res = res.data

        if (!res.data) {
          that.showNoData = true
          return
        }
        that.theMsg = res.data
      }

      var ajaxError = function (errorRes) {
        that.showErrorWindow = true
        that.ajaxErrorMesg = errorRes
      }

      var fetchData = function () {
        msgSrv.getMessage(that.msgID).then(ajaxSuccess, ajaxError)
      }
    }]
  })
