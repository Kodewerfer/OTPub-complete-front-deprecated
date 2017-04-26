angular
  .module('userCenter.entp')
  .component('entpCourses', {
    template: require('./entp.courses.temp.html'),
    controller: ['entpCoursesService', 'Upload', '$timeout', function (courseSrv, $uploadSrv, $timeout) {
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

      // upload file
      this.uploadMsg = false
      this.uploadFile = function (file, errorFile, theItem) {
        if (errorFile.length) {
          var theFile = errorFile[0]
          if (theFile.$error === 'maxSize') {
            that.uploadMsg = '【' + theFile.name + '】 过大！必须小于' + theFile.$errorParam
          }
          return
        }

        // calling upload service to upload the file
        $uploadSrv.upload({
          url: '/User/Company/import',
          data: { file: file, course_id: theItem.course_id }
        })
          .then(function (res) {
            // success
            theItem.import_status = 1
            that.uploadMsg = res.data.msg
            that.showAfterUploadDialog = true
          }, function () {
            // error
            theItem.import_status = 2
          })
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
