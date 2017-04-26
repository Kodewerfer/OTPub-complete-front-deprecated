angular
  .module('userCenter.entp')
  .component('entpCourses.details', {
    template: require('./entp.courses.details.temp.html'),
    bindings: {
      courseId: '<'
    },
    controller: ['entpCoursesService', 'filterFilter', function (courseSrv, arrayFilter) {
      var that = this
      this.tableFilter = ''
      this.$onInit = function () {
        that.fetchData(that.courseId)
      }
      // the list datas
      this.theListMeta = [] // ajax fetched data
      this.theList = []
      this.theListPaged = [] // paged list

      this.dataSlicer = function (start, ends) {
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

      this.fetchData = function (param) {
        that.showDataTable = false

        courseSrv.getDetails(that.courseId).then(ajaxSuccess, ajaxError)
      }
    }]
  })
