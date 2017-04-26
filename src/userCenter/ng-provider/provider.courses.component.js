angular
  .module('userCenter.provider')
  .component('providerCourses', {
    template: require('./provider.courses.temp.html'),
    controller: ['providerCoursesService', function (courseSrv) {
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
        courseSrv.getCoursesList().then(ajaxSuccess, ajaxError)
      }
    }]
  })
