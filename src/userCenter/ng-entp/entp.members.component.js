angular
  .module('userCenter.entp')
  .component('entpMembers', {
    template: require('./entp.members.temp.html'),
    controller: ['entpMemberService', 'filterFilter', function (memberSrv, arrayFilter) {
      var that = this
      this.tableFilter = ''
      this.exportFileAddr = '' // 导出成员下载地址
      this.$onInit = function () {
        that.fetchData()
      }
      // the list datas
      this.theListMeta = [] // ajax fetched data
      this.theList = []
      this.theListPaged = [] // paged list

      this.dataSlicer = function (start, ends) {
        // debugger
        that.theListPaged = []
        that.theListPaged = that.theList.slice(start, ends)
      }

      this.filterData = function () {
        that.theList = arrayFilter(that.theListMeta, that.tableFilter)
      }

      // switches for the pop outs.
      this.showErrorWindow = false
      this.showDataTable = false
      this.showNoData = false
      this.ajaxErrorMesg = ''

      var ajaxSuccess = function (res) {
        res = res.data

        if (!res.data || !res.data.length) {
          that.showNoData = true
          return
        }
        that.theListMeta = res.data
        that.theList = that.theListMeta
        that.showDataTable = true
      }

      var ajaxError = function (errorRes) {
        that.showErrorWindow = true
        that.showDataTable = false
        that.ajaxErrorMesg = errorRes
      }

      this.fetchData = function () {
        that.showDataTable = false
        memberSrv.getMembersList().then(ajaxSuccess, ajaxError)

        memberSrv.getDownloadAddr().then(function (res) {
          that.exportFileAddr = res.data.file
        }, function () {
          that.exportFileAddr = ''
        })
      }
    }]
  })
