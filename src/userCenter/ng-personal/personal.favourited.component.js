angular
  .module('userCenter.personal')
  .component('personalFaviCourses', {
    template: require('./personal.favourited.temp.html'),
    controller: ['personalFaviCoursesService', function (faviSrv) {
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

      // delete action
      this.deleteAct = function (targetID) {
        faviSrv.deleteItem({
          courseid: targetID
        }).success(function (res) {
          that.fetchData()
        })
        return false
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

        that.theList = res.data
        that.showDataTable = true
      }

      var ajaxError = function (errorRes) {
        that.showErrorWindow = true
        that.showDataTable = false
        that.ajaxErrorMesg = errorRes
      }

      this.fetchData = function () {
        that.showDataTable = false
        faviSrv.getFaviList().then(ajaxSuccess, ajaxError)
      }
    }]
  })
