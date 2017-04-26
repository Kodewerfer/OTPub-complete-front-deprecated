angular
  .module('userCenter.personal')
  .component('personalBroadcast', {
    template: require('./personal.broadcast.temp.html'),
    controller: ['personalBroadcastService', function (bdcSrv) {
      var that = this
      this.$onInit = function () {
        that.fetchData()
      }
      // the list datas
      this.theList = []
      this.theListPaged = [] // paged list
      this.dataSlicer = function (start, ends) {
        that.theListPaged = that.theList.slice(start, ends)
      }

      // switches for the pop outs.
      this.showErrorWindow = false
      this.ajaxErrorMesg = ''

      var ajaxSuccess = function (res) {
        res = res.data

        if (!res.data || !res.data.length) {
          return
        }
        that.theList = res.data
        that.showDataTable = true
      }

      var ajaxError = function (errorRes) {
        that.showErrorWindow = true
        that.ajaxErrorMesg = errorRes
      }

      this.fetchData = function () {
        bdcSrv.getBroadcastList().then(ajaxSuccess, ajaxError)
      }
    }]
  })
