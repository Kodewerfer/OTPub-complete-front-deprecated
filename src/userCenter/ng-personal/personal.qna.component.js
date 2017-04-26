angular
  .module('userCenter.personal')
  .component('personalQnA', {
    template: require('./personal.qna.temp.html'),
    controller: ['personalQuestionService', 'filterFilter', function (qSrv, arrayFilter) {
      var that = this

      this.$onInit = function () {
        fetchData()
      }

      // the message list
      this.dataListMeta = []
      this.dataList = []
      this.dataListPaged = []
      this.dataSlicer = function (start, ends) {
        that.dataListPaged = that.dataList.slice(start, ends)
      }
      this.listFilter = ''
      this.currentFilterType = 0
      var filterList = function () {
        that.dataList = arrayFilter(that.dataListMeta, that.listFilter)
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

      var fetchData = function () {
        qSrv.fetch().then(function (res) {
          res = res.data

          that.dataListMeta = res['list']

          if (!that.dataListMeta.length) {
            that.showNoData = true
            return
          }

          filterList()
        }, function (errorRes) {
          that.showErrorWindow = true
          that.ajaxErrorMesg = errorRes
        })
      }
    }]
  })
