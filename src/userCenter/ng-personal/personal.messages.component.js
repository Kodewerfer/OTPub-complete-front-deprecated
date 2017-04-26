angular
  .module('userCenter.personal')
  .component('personalMessages', {
    template: require('./personal.messages.temp.html'),
    controller: ['personalMessagesService', 'filterFilter', function (msgSrv, arrayFilter) {
      var that = this
      this.$onInit = function () {
        fetchData()
      }

      // the message list
      this.msgListMeta = []
      this.msgList = []
      this.msgListPaged = []
      this.dataSlicer = function (start, ends) {
        // debugger
        that.msgListPaged = that.msgList.slice(start, ends)
      }
      this.listFilter = ''
      this.currentFilterType = 0
      var filterList = function () {
        that.msgList = arrayFilter(that.msgListMeta, that.listFilter)
      }
      this.setListFilter = function (filter, type) {
        that.listFilter = filter
        that.currentFilterType = type
        filterList()
      }

      // ajax handling.
      this.ajaxErrorMesg = ''
      this.showErrorWindow = false
      this.showNoData = false

      var ajaxSuccess = function (res) {
        res = res.data

        that.msgListMeta = res.data

        if (!that.msgListMeta.length) {
          that.showNoData = true
          return
        }

        filterList()
      }

      var ajaxError = function (errorRes) {
        that.showErrorWindow = true
        that.ajaxErrorMesg = errorRes
      }

      var fetchData = function () {
        msgSrv.getMessageList().then(ajaxSuccess, ajaxError)
      }
    }]
  })
